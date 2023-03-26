USE crms_DB
GO

-- USERS STORED PROCEDURES---
-- 1.Adding a user;
CREATE PROCEDURE add_user
  @full_name VARCHAR(255),
  @phone VARCHAR(30),
  @email VARCHAR(255),
  @gender VARCHAR(20),
  @role VARCHAR(50),
  @password VARCHAR(255)
AS
BEGIN
  INSERT INTO users
    (full_name,phone,email, gender ,[role],joined_at,[password])
  VALUES
    (@full_name, @phone, @email, @gender, @role, GETDATE(), @password)
END
GO

--2.Query all users
CREATE PROCEDURE get_users
AS
BEGIN
  SELECT *
  FROM users
END
GO



--3. Getting single user
CREATE PROCEDURE get_single_users
  @email VARCHAR(255)
AS
BEGIN
  SELECT *
  FROM users
  WHERE email = @email
END
GO


-- update user details
CREATE PROCEDURE update_user_det
  @user_id INT,
  @new_full_name VARCHAR(255) = NULL,
  @new_email VARCHAR(255) = NULL,
  @new_phone VARCHAR(30) = NULL
AS
BEGIN
  UPDATE users
    SET 
        full_name = ISNULL(@new_full_name, full_name),
        email = ISNULL(@new_email, email),
        phone = ISNULL(@new_phone, phone)
    WHERE id = @user_id;

  -- update customers table if there exits
  UPDATE customers
  SET full_name = ISNULL( @new_full_name,full_name),
      email = ISNULL( @new_email,email),
      phone = ISNULL( @new_phone,phone)
  WHERE id = @user_id
END;
GO


--4. Adding Customer {called with add user procedure}
CREATE PROCEDURE add_customer
  @full_name VARCHAR(255),
  @email VARCHAR(255) ,
  @phone VARCHAR(20) ,
  @gender VARCHAR(20)

AS
BEGIN
  DECLARE @cust_id  INT
  INSERT INTO users
    (full_name,phone,email, gender,[role],joined_at,[password])
  VALUES
    (@full_name, @phone, @email, @gender, 'customer', GETDATE(), 'pass'+ @phone)
  -- getting id
  SET @cust_id = SCOPE_IDENTITY()
  -- updating cutomer table
  INSERT INTO customers
    (id,full_name, email, phone,gender, joined_At)
  VALUES
    (@cust_id, @full_name, @email, @phone, @gender, GETDATE())
END
GO

--5. Query all customers.
CREATE PROCEDURE get_customers
AS
BEGIN
  SELECT *
  FROM customers
END
GO

--6. Get single customer
CREATE PROCEDURE get_single_customer
  @phone VARCHAR(20)
AS
BEGIN
  SELECT *
  FROM customers
  WHERE phone = @phone
END
GO

-- 7. edit customer details
CREATE PROCEDURE update_customer
  @customer_id INT,
  @full_name VARCHAR(255) = NULL,
  @email VARCHAR(255) =NULL,
  @phone VARCHAR(20) = NULL
AS
BEGIN
  -- update the users table
  UPDATE users
  SET full_name = ISNULL( @full_name,full_name),
      email = ISNULL( @email,email),
      phone = ISNULL( @phone,phone)
  WHERE id = @customer_id



  -- update the customers table
  UPDATE customers
  SET full_name = ISNULL( @full_name,full_name),
      email = ISNULL( @email,email),
      phone = ISNULL( @phone,phone)
  WHERE id = @customer_id
END
GO


-- SALES STORED PROCEDURES.
-- 1. Make a sale
CREATE PROCEDURE add_sale
  @made_by_id INT,
  @sale_date DATE,
  @sale_state VARCHAR(50),
  @loyalty_points INT,
  @product_id INT,
  @quantity INT,
  @price FLOAT
AS
BEGIN
  DECLARE @sale_id INT
  DECLARE @customer_id INT = @made_by_id
  -- assign the value of @made_by_id to @customer_id

  -- add the sale
  INSERT INTO sales
    (customer_id, made_by, sale_date, sale_state)
  VALUES
    (@customer_id, @made_by_id, @sale_date, @sale_state)

  -- add line item to line_items table
  SET @sale_id = SCOPE_IDENTITY()

  INSERT INTO line_items
    (sale_id, product_id, quantity, price)
  VALUES
    (@sale_id, @product_id, @quantity, @price)

  -- add loyalty points to the customer
  UPDATE customers SET loyalty_points = loyalty_points + @loyalty_points WHERE id = @customer_id
END
GO

-- 2.Update sale state

CREATE PROCEDURE update_sale_state
  (
  @salee_id INT,
  @sale_state VARCHAR(50)
)
AS
BEGIN
  UPDATE sales SET sale_state = @sale_state WHERE id = @salee_id
END
GO
-- 3.query all sales with their data(products, customer,made by)
CREATE PROCEDURE get_all_sales_with_products
AS
BEGIN
  SELECT
    s.id AS SaleId,
    c.full_name AS CustomerName,
    u.full_name AS MadeByName,
    p.name AS ProductName,
    li.quantity AS Quantity,
    li.price AS Price
  FROM
    sales s
    JOIN customers c ON s.customer_id = c.id
    JOIN users u ON s.made_by = u.id
    JOIN line_items li ON s.id = li.sale_id
    JOIN products p ON li.product_id = p.id
END
GO

-- 4.query single sale with its data(products, customer,made by)
CREATE PROCEDURE get_sale_details
  @saleId INT
AS
BEGIN
  SELECT s.id AS SaleId, s.sale_date AS SaleDate, s.sale_state AS SaleState, c.full_name AS CustomerName, u.full_name AS MadeByName,
    p.id AS ProductId, p.name AS ProductName, p.price AS ProductPrice, li.quantity AS Quantity, li.price AS TotalPrice
  FROM sales s
    INNER JOIN customers c ON s.customer_id = c.id
    INNER JOIN users u ON s.made_by = u.id
    INNER JOIN line_items li ON s.id = li.sale_id
    INNER JOIN products p ON li.product_id = p.id
  WHERE s.id = @saleId
END
GO


-- NOTIFICTIONS
-- 1. Add Noticiaction
CREATE PROCEDURE add_notification
  @message TEXT,
  @notification_date DATE
AS
BEGIN
  INSERT INTO notifications
    ( [message], notification_date)
  VALUES
    ( @message, @notification_date)
END
GO

-- 2. get all notifications
CREATE PROCEDURE get_notitications
AS
BEGIN
  SELECT*
  FROM notifications
END
GO


-- CATEGORIES
CREATE PROCEDURE add_category
  @category_name VARCHAR(255),
  @description NVARCHAR(255)

AS
BEGIN
  -- Check if category already exists
  -- IF EXISTS (SELECT *
  -- FROM categories
  -- WHERE name = @category_name)
  -- BEGIN
  --   PRINT 'Category already exists'
  --   RETURN
  -- END
  -- ELSE 
  -- BEGIN
  INSERT INTO categories
    ([name],[description])
  VALUES(@category_name, @description)
-- END
END
GO


-- Updating category
CREATE PROCEDURE update_category
  @category_id INT,
  @name VARCHAR(255),
  @approved BIT
AS
BEGIN
  UPDATE categories
  SET name = @name,
      approved = @approved
  WHERE id = @category_id
END
GO
-- Deleting Category
CREATE PROCEDURE delete_category
  @category_name VARCHAR(255)
AS
BEGIN
  DELETE FROM categories WHERE [name] = @category_name
END
GO


-- PRODUCTS
-- 1. Add product
CREATE PROCEDURE add_product
  @name VARCHAR(255),
  @price FLOAT,
  @items_added INT,
  @added_on DATE,
  @category_id INT
AS
BEGIN
  INSERT INTO products
    ([name], price, items_added, added_on, category_id)
  VALUES
    (@name, @price, @items_added, @added_on, @category_id)
END
GO


-- 2. Update product
CREATE PROCEDURE update_product
  @id INT,
  @name VARCHAR(255),
  @price FLOAT,
  @items_added INT,
  @added_on DATE,
  @category_id INT
AS
BEGIN
  UPDATE products
    SET [name] = @name, price = @price, items_added = @items_added, added_on = @added_on, category_id = @category_id
    WHERE id = @id
END
GO
-- 3. Delete product
CREATE PROCEDURE delete_product
  @id INT
AS
BEGIN
  DELETE FROM products
    WHERE id = @id
END
GO
-- 4. Query all products
CREATE PROCEDURE get_products
AS
BEGIN
  SELECT *
  FROM products
END
GO
--5. Query single product
CREATE PROCEDURE get_product_by_id
  @prod_id INT
AS
BEGIN
  SELECT *
  FROM products
  WHERE id = @prod_id
END
GO


