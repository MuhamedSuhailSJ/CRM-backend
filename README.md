# CRM Backend System

## 📌 Overview
This repository contains the backend system for a simple CRM application that enables the management of customer data, including contacts, companies, and interactions. The focus is on scalability, security, and comprehensive API documentation.

## 🚀 Features
- **Customer Management**: Full CRUD operations for customer data.
- **User Authentication**: Secure authentication using JWT.
- **Database**: Relational database with structured schema.
- **Search & Filtering**: Search customers by name, email, or phone with filtering options.
- **Error Handling & Validation**: Proper validation and structured error responses.
- **Code Best Practices**: Modular, well-structured, and secure.

## 🛠️ Technologies Used
- **Backend Framework**: Node.js with Express (or Django, Flask, etc.)
- **Database**: MySQL
- **Authentication**: JWT & Password Hashing (bcrypt)

## 🔧 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/MuhamedSuhailSJ/crm-backend.git
   cd crm-backend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Configure environment variables:
   - Create a `.env` file and define necessary database and authentication settings.

4. Run database migrations:
   ```sh
   npm run migrate  # or appropriate ORM command
   ```
5. Start the server:
   ```sh
   npm start  # or yarn start
   ```

## 📡 API Endpoints
### 🔐 Authentication
- **POST** `/api/register` - Register a new user.
- **POST** `/api/login` - Authenticate user & receive a JWT token.

### 📋 Customers
- **GET** `/api/customers` - Retrieve all customers (search & filtering options available).
- **POST** `/api/customers` - Create a new customer.
- **GET** `/api/customers/:id` - Retrieve a specific customer.
- **PUT** `/api/customers/:id` - Update customer details.
- **DELETE** `/api/customers/:id` - Remove a customer.

## 🗂 Database Schema
A relational database structure with the following tables:
- **Users**: Stores user credentials with role-based access control.
- **Customers**: Stores customer information, linked to users.

## ⚠️ Error Handling
- Uses structured error messages with appropriate HTTP status codes.
- Validates input data (e.g., email format, required fields).

## 🎯 Optional Enhancements
- Pagination support for large datasets.
- Customer interaction logging for follow-ups.

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch and open a pull request.

