CREATE TYPE user_role AS ENUM ('buyer', 'admin', 'vendor', 'staff');

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    vendorId INT REFERENCES Users(id)
);

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    priceOld DECIMAL(10, 2) NOT NULL,
    priceNew DECIMAL(10, 2) NOT NULL,
    startDate DATE NOT NULL,
    expiryDate DATE NOT NULL,
    freeDelivery BOOLEAN DEFAULT FALSE,
    deliveryAmount DECIMAL(10, 2),
    vendorId INT REFERENCES Users(id),
    url VARCHAR(255) NOT NULL UNIQUE
);
