
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Baby Wipes", "Baby Care",2.50, 100), ("chocolate", "food",3.10, 120), ("strawberry", "food",3.25, 75),("pasta", "food",9.25, 12),("blue flop filper", "appearl",25, 2),("Tank", "appearl",13.10, 1);

