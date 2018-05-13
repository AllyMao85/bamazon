USE bamazon_DB;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NULL, 
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);


INSERT INTO products (department_name, over_head_costs)
VALUES ("appearl", 3000), ("food", 1200), ("Baby Care", 750),("Landscape", 10000),("tools", 200);

