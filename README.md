# E-commerce API Backend

This project is an API backend for an e-commerce website built using **Node.js** and **MongoDB**. It supports multiple user roles, each with specific permissions and functionalities. The roles include **Admin**, **Staff**, **Vendor**, and **Buyer**. The project allows users to register, view products, add products, and manage the product catalog based on their role in the system.

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

- The backend uses **MongoDB** to store information about users, vendors, staff, products, etc.
- The database is designed with collections for users, products, and roles.

### Key Collections:

- **Users**: Stores user details (name, email, password, role).
- **Products**: Stores product details (name, description, price, start date, expiry date, vendor ID, etc.).
- **Roles**: Stores user roles and permissions.

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
- **MongoDB** database (local or cloud).
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

3. **MongoDB Configuration**:
   - Make sure MongoDB is installed and running on your local machine or use a cloud MongoDB service like **MongoDB Atlas**.
   - Configure the MongoDB connection in the `.env` file:
     ```env
     MONGO_URI=mongodb://localhost:27017/ecommerce_db
     ```

4. **Run the Application**:
   Start the server by running:
   ```bash
   npm run dev
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

The MongoDB database uses collections for **Users** and **Products**. Below is an overview of the database schema.

### Users Collection

```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "buyer", // Can be 'admin', 'staff', 'vendor', or 'buyer'
  "createdAt": ISODate("2023-01-01T00:00:00Z")
}
```

### Products Collection

```json
{
  "_id": ObjectId,
  "name": "Product Name",
  "description": "Product description",
  "price": 100.00,
  "old_price": 150.00,
  "start_date": ISODate("2025-01-01T00:00:00Z"),
  "expiry_date": ISODate("2025-01-08T00:00:00Z"),
  "delivery_amount": 10.00,
  "free_delivery": false,
  "vendor_id": ObjectId("vendor_object_id"),
  "image_url": "https://example.com/image.jpg",
  "unique_url": "product-unique-url"
}
```
