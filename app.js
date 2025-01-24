const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./config")

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
  response.send(token);
  jwt.verify(token, "SECRETTOKEN", async (error, payload) => {
    if (error) {
      console.log(error);
    } else {
      request.payload = payload;
      request.id = id;
      request.body = { name, email, phone, company };
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

app.post("/login", async (request, response) => {
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
          response.cookie("JwtToken", {jwtToken});
      response.send({ jwtToken });
    } else {
      response.send("Invalid Password");
      response.status(400);
    }
  }
});

app.get("/customers", authentication, async (request, response) => {
  const { payload } = request;
  const { user_id } = payload;
  const getAllCustomers = await customers.findAll({ where: { user_id } });
  response.send("All Customers Shown");
  response.status(200);
});

app.get("/customers/:id", authentication, async (request, response) => {
  const { id } = request.params;
  const { payload } = request;
  const getAllCustomers = await customers.findAll({ where: { id } });
  response.send(`All ${id} Customer Shown`);
  response.status(200);
});

app.post("/customers", authentication, async (request, response) => {
  const { name, email, phone, company } = request.body;
  const { user_id } = payload;
  const createCustomer = await customers.create({
    name,
    email,
    phone,
    company,
    user_id,
  });
  response.send("Customer Created Sucessfully");
  response.status(200);
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

app.put("/customers/:id", authentication, async (request, response) => {
  const { id } = request.params;
  const deleteCustomer = await customers.destroy({ where: { id } });
  response.send("Deleted Successfully");
  response.status(400);
});

module.exports = app;
