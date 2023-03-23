-- CREATE Database crms_DB
-- Go

Use crms_DB
GO

-- USERS TABLE
CREATE TABLE users
(
    id INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    password VARCHAR(255) NOT NULL,
    [role] VARCHAR(50) NOT NULL
);

-- CUSTOMERS TABLE
CREATE TABLE customers
(
    id INT PRIMARY KEY IDENTITY(1,1),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    joined_At DATE NOT NULL,
    loyalty_points INT DEFAULT 0
);

-- CATEGORIES TABLE
CREATE TABLE categories
(
    id INT PRIMARY KEY IDENTITY(1,1),
    [name] VARCHAR(255) UNIQUE NOT NULL,
    approved BIT DEFAULT 0
);

-- PRODUCTS TABLE
CREATE TABLE products
(
    id INT PRIMARY KEY IDENTITY(1,1),
    [name] VARCHAR(255) UNIQUE NOT NULL,
    price FLOAT NOT NULL,
    items_added INT NOT NULL,
    added_on DATE NOT NULL,
    category_id INT FOREIGN KEY REFERENCES categories(id),
    approved BIT DEFAULT 0
);

-- SALES TABLE
CREATE TABLE sales
(
    id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT FOREIGN KEY REFERENCES customers(id),
    made_by INT FOREIGN KEY REFERENCES users(id),
    sale_date DATE NOT NULL,
    sale_state VARCHAR(50) CHECK (sale_state IN ('completed', 'refunded'))
);

-- LINE ITEMS TABLE
CREATE TABLE line_items
(
    id INT PRIMARY KEY IDENTITY(1,1),
    sale_id INT FOREIGN KEY REFERENCES sales(id),
    product_id INT FOREIGN KEY REFERENCES products(id),
    quantity INT NOT NULL,
    price FLOAT NOT NULL
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications
(
    id INT PRIMARY KEY IDENTITY(1,1),
    [message] TEXT NOT NULL,
    notification_date DATE NOT NULL
);

