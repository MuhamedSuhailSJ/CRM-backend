const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./config");

const users = require("./module/user");
const customers = require("./module/customer");
const { where, Model } = require("sequelize");

app.use(express.json());

users.hasOne(customers);

db.sync()
  .then((result) => {
    console.log("Syned");
  })
  .catch((error) => {
    console.log("error");
  });

app.listen(3000);

const authentication = async (request, response, next) => {
  const token = request.headers.cookie;
  if (token === undefined) {
    response.send("Please Login");
    return;
  }
  console.log(token.split("=")[1]);
  jwt.verify(token.split("=")[1], "SECRETTOKEN", async (error, payload) => {
    if (error) {
      console.log("Error in Logging");
      console.log(error);
    } else {
      console.log("Loged In");
      console.log(payload);
      request.payload = payload;
      next();
    }
  });
};

app.post("/register", async (request, response) => {
  const { name, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const getUser = await users.findAll({ where: { email } });
  if (getUser.toJSON === undefined) {
    const createUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    response.send("User Created Sucessfully");
    response.status(200);
  } else {
    response.send("Error in Creating the User");
    response.status(400);
  }
});

app.post("/api/login", async (request, response) => {
  const { email, password } = request.body;
  const userfind = JSON.parse(
    JSON.stringify(await users.findAll({ where: { email } }))
  )[0];
  if (userfind === undefined) {
    response.send("User Not Found");
    response.status(400);
  } else {
    const isPasswordMatched = await bcrypt.compare(password, userfind.password);
    if (isPasswordMatched) {
      const jwtToken = jwt.sign(userfind, "SECRETTOKEN");
      response.cookie("JwtToken", jwtToken);
      response.send({ jwtToken });
    } else {
      response.send("Invalid Password");
      response.status(400);
    }
  }
});

app.get("/customers", authentication, async (request, response) => {
  const { payload } = request;
  console.log(payload);
  const { id } = payload;
  console.log(id);
  const getAllCustomers = await customers.findAll({ where: { userId: id } });
  response.send("Customer Got" + JSON.stringify(getAllCustomers));
  console.log(JSON.stringify(getAllCustomers));
});

app.get("/customers/:id", authentication, async (request, response) => {
  const { id } = request.params;
  const userId = request.payload.id;
  const getIdCustomers = await customers.findOne({ where: { id, userId } });
  if (JSON.parse(JSON.stringify(getIdCustomers)).id === id) {
    response.send(`Customer ${id} Got`);
    response.status(200);
  } else {
    response.send("Customer Not Exist, Please Check It");
    response.status(401);
  }
});

app.post("/customers", authentication, async (request, response) => {
  const { name, email, phone, company } = request.body;
  const { id } = request.payload;
  const checkExistingCustomer = await customers.findOne({ where: { email } });
  if (JSON.stringify(checkExistingCustomer).email === email) {
    const createCustomer = await customers.create({
      name,
      email,
      phone,
      company,
      userId: id,
    });
    response.send("Customer Created Sucessfully");
    response.status(200);
  } else {
    response.send("Customer Already Existed");
    response.status(401);
  }
});

app.put("/customers/:id", authentication, async (request, response) => {
  const { id } = request.params;
  const { name, email, phone, company } = request.body;
  const updatedCustomer = await customers.update(
    { name, email, phone, company },
    { where: { id } }
  );
  response.send("Updated Successfully");
  response.status(400);
});

app.delete("/customers/:id", authentication, async (request, response) => {
  const { id } = request.params;
  const deleteCustomer = await customers.destroy({ where: { id } });
  response.send("Deleted Successfully");
  response.status(400);
});

module.exports = app;
