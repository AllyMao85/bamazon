var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    supervisorView();
    
    //connection.end();
  });


function supervisorView() {
    inquirer.prompt({
        name: "supMenu",
        type: "list",
        message: "Which option",
        choices: [
            "View Product Sales by Department",
            "Create New Department"            
        ]  
    }) 
    .then(function (option){
        switch(option.supMenu) {
          case "View Product Sales by Department":
          viewProductsales();
          break;
          case "Create New Department":
          createDept();
          break;

        }
    })
}

function viewProductsales() {
    //use table join
    var sql = "SELECT AVG(departments.department_id) AS deptid, products.department_name, SUM(departments.over_head_costs) AS totaloverhead, SUM(products.product_sales) AS totalsales FROM products RIGHT JOIN departments on products.department_name=departments.department_name GROUP BY products.department_name;";
    //var sql = "SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) FROM products FULL OUTER JOIN departments on products.department_name=departments.department_name  GROUP BY products.department_name";
    //var sql = "SELECT departments.department_id, products.department_name, over_head_costs, SUM(product_sales) FROM products, departments WHERE products.department_name=departments.department_name GROUP BY products.department_name";
    //SELECT departments.department_id, products.department_name, products.product_name, departments.over_head_costs, SUM(products.product_sales) AS totalsales FROM products RIGHT JOIN departments on products.department_name=departments.department_name GROUP BY products.department_name;
    connection.query(sql, function(err, res){
        if (err) throw err;
        var deptlist=[];
        console.log('|department_id | department_name | over_head_costs | product_sales  | totalprofit |');
        console.log('|--------------|-----------------|-----------------|----------------|-------------|');
        for (var i=0; i<res.length; i++) {
            //console.log(isNaN(res[i].department_name));
            if (isNaN(res[i].department_name)===true) {
            var totalProfit = res[i].totalsales-res[i].totaloverhead;
            //productlist.push(res[i].item_id+'. '+res[i].product_name+' ' +res[i].department_name+ ' $'+ res[i].price);
            deptlist[i]='|'+res[i].deptid+'             | '+res[i].department_name+'         |$'+ res[i].totaloverhead+ '              | '+res[i].totalsales+ '            | '+totalProfit+ '        |';
            console.log(deptlist[i]);
            //console.log(productlist);
            } else {
                continue;
            }
        }
    })
}   

function createDept() {
    
    inquirer.prompt([     
         {
            name: "deptname",
            type: "input",
            message: "Department Name"
         },
         {
            name: "overhead",
            type: "input",
            message: "Department Overhead Cost"
            // validate: function(value){}
         }]
        ) 
        .then(function (dept){     
           //USE bamazon_DB; 
           var sql ="INSERT INTO departments (department_name, over_head_costs) VALUES ('"+ dept.deptname+"', '"+ dept.overhead+"')";
           console.log(sql);
           connection.query(sql, function(err, res){
            if (err) throw err;
            console.log("New Department Added!");
            })
        });
}


module.exports = supervisorView;