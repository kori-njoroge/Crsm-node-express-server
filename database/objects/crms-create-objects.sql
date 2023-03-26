-- CREATE Database crms_DB
-- Go

Use crms_DB
GO

-- USERS TABLE
CREATE TABLE users
(
    id INT PRIMARY KEY IDENTITY(105,1),
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    [role] VARCHAR(50) NOT NULL,
    joined_at DATE NOT NULL,
    [password] NVARCHAR(255) NOT NULL
)
GO

-- CUSTOMERS TABLE
CREATE TABLE customers
(
    id INT PRIMARY KEY ,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30) UNIQUE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    joined_At DATE NOT NULL,
    loyalty_points INT DEFAULT 0
)
Go

-- CATEGORIES TABLE
CREATE TABLE categories
(
    id CHAR(6) PRIMARY KEY DEFAULT SUBSTRING(CONVERT(VARCHAR(40), NEWID()), 1, 6),
    [name] VARCHAR(255) UNIQUE NOT NULL,
    [description] NVARCHAR(255) NOT NULL,
    added_by INT FOREIGN KEY REFERENCES users(id),
    updated_by INT FOREIGN KEY REFERENCES users(id),
    updated_on DATE,
    added_on DATE NOT NULL,
    isdeleted BIT DEFAULT 0,
    approved BIT DEFAULT 0
)
GO

-- PRODUCTS TABLE
CREATE TABLE products
(
    id INT PRIMARY KEY IDENTITY(1,1),
    [name] VARCHAR(255) UNIQUE NOT NULL,
    price FLOAT NOT NULL,
    items_added INT NOT NULL,
    added_on DATE NOT NULL,
    category_id CHAR(6) FOREIGN KEY REFERENCES categories(id),
    approved BIT DEFAULT 0
)
GO

-- SALES TABLE
CREATE TABLE sales
(
    id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT FOREIGN KEY REFERENCES customers(id),
    made_by INT FOREIGN KEY REFERENCES users(id),
    sale_date DATE NOT NULL,
    sale_state VARCHAR(50) CHECK (sale_state IN ('completed', 'refunded'))
)
GO
-- LINE ITEMS TABLE
CREATE TABLE line_items
(
    id INT PRIMARY KEY IDENTITY(1,1),
    sale_id INT FOREIGN KEY REFERENCES sales(id),
    product_id INT FOREIGN KEY REFERENCES products(id),
    quantity INT NOT NULL,
    price FLOAT NOT NULL
)
GO

-- NOTIFICATIONS TABLE
CREATE TABLE notifications
(
    id INT PRIMARY KEY IDENTITY(1,1),
    [message] TEXT NOT NULL,
    notification_date DATE NOT NULL
)
GO

