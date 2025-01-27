# E-commerce API Backend

This project is an API backend for an e-commerce website built using **Node.js**. It supports multiple user roles, each with specific permissions and functionalities. The roles include **Admin**, **Staff**, **Vendor**, and **Buyer**. The project allows users to register, view products, add products, and manage the product catalog based on their role in the system.

## Project Overview

The API facilitates the following core functionalities:

- **User Authentication & Role-Based Access**: Allows users to sign up, log in, and access system resources based on their assigned roles.
- **CRUD Operations**: Supports creating, reading, updating, and deleting products. Different roles have different access to these operations.
- **Product Management**: Admin, staff, and vendors can create and manage products, including product details, prices, and images.
- **Product Search & Pagination**: Provides search functionality and pagination for better product listing management.

## Roles and Permissions

1. **Admin**: 
   - Can view all vendor, staff, and user details.
   - Can create products and set the start and expiry dates for products.
   - Can upload product images and define old/new prices and delivery options.
   - Full access to all functionalities.

2. **Staff**: 
   - Can view and add products for assigned vendors.
   - Can set product details such as name, description, and prices.
   
3. **Vendor**: 
   - Can view and manage only their own products.
   - Can set details for their own products.

4. **Buyer (User)**: 
   - Can view all products.
   - Can see vendor information, expiry time, and discount information for each product.

## Database

- The backend uses a **MySQL** database to store information about users, vendors, staff, products, etc.
- **Important Tables**:
  - **Users**: For storing user details (name, email, password, role).
  - **Products**: For storing product details (name, description, price, start date, expiry date, vendor ID, etc.).
  - **Roles**: For storing user roles and permissions.

## Features

- **User Authentication**: 
  - Buyers and vendors can sign up and log in.
  - Admin and staff users can be created by the super-admin.
  - Passwords are hashed before storing.

- **Product Management**:
  - Admin can add, edit, or delete products.
  - Each product has a unique URL.
  - Products have a start and expiry date (expiry is set 7 days after the start date).
  - Free delivery and delivery amount are handled.

- **Discount Calculation**:
  - Discount percentage and amount are calculated on the fly, not stored in the database.
  
- **Search and Pagination**:
  - Implemented a search feature to find products.
  - Server-side pagination for product listing.

## Getting Started

### Prerequisites

- **Node.js** installed on your machine.
- **MySQL** database setup.
- **Postman** to test the API endpoints.

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/parthasarathy27/E-commerce-API-BE.git
   cd E-commerce-API-BE
   ```

2. **Install Dependencies**:
   Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. **Database Configuration**:
   - Create a **MySQL** database and configure the credentials in `.env` file:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=password
     DB_NAME=ecommerce_db
     ```
   
4. **Migrate the Database**:
   Run the SQL script `db-schema.sql` to create the necessary tables in the database:
   ```bash
   mysql -u root -p < db-schema.sql
   ```

5. **Run the Application**:
   Start the server by running:
   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:3000`.

### API Endpoints

- **POST /auth/signup**: Register a new user (buyer/vendor).
- **POST /auth/login**: Log in to the system and receive a JWT token.
- **GET /products**: Get a list of all products (with pagination and search filters).
- **GET /products/:id**: Get product details by ID.
- **POST /products**: Admin/Staff/Vendor can create a new product.
- **PUT /products/:id**: Update a product (Admin/Staff).
- **DELETE /products/:id**: Delete a product (Admin/Staff).
- **GET /users**: Get all users (Admin only).
- **POST /users**: Create a new user (Admin only).
  
### Example Postman Collection

Included in the repository is a **Postman collection** to test the various API endpoints. You can import this collection into Postman for easier testing.

## Security Considerations

- Passwords are hashed using **bcrypt** before being stored in the database.
- Authentication is handled via **JWT tokens**, which are required for accessing protected routes.
- Role-based access control ensures that only authorized users can access certain endpoints.

## Database Schema

The database schema for this project is provided in the `db-schema.sql` file, which includes the creation of necessary tables such as `Users`, `Roles`, `Products`, etc.

### Example SQL Schema

```sql
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'staff', 'vendor', 'buyer'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    old_price DECIMAL(10, 2),
    start_date DATETIME,
    expiry_date DATETIME,
    delivery_amount DECIMAL(10, 2),
    free_delivery BOOLEAN,
    vendor_id INT,
    UNIQUE (name),
    FOREIGN KEY (vendor_id) REFERENCES Users(id)
);
```
