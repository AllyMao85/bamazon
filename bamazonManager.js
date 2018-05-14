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
    //console.log("connected as id " + connection.threadId);
    managerView();
    
    //connection.end();
  });


function managerView() {
    inquirer.prompt({
        name: "mgrMenu",
        type: "list",
        message: "Which option",
        choices: [
            "View Product for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
        // validate: function (value) {
        //        if (isNaN(value)===false) {

        //        }else {}
        //    }
    }) 
    .then(function (option){
        switch(option.mgrMenu) {
          case "View Product for Sale":
          viewProduct();
          break;
          case "View Low Inventory":
          viewLowinv();
          break;
          case "Add to Inventory":
          addInv();
          break;
          case "Add New Product":
          addProduct ();
          break;
        }
    })
}

function viewProduct() {
    
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        var productlist=[];
        for (var i=0; i<res.length; i++) {
            //productlist.push(res[i].item_id+'. '+res[i].product_name+' ' +res[i].department_name+ ' $'+ res[i].price);
            productlist[i]=res[i].item_id+'. '+res[i].product_name+' $'+ res[i].price+ ' '+res[i].stock_quantity;
            console.log(productlist[i]);
            //console.log(productlist);
        }
    })
}

function viewLowinv() {
    var sql = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(sql, function(err, res){
        if (err) throw err;
        var productlist=[];
        for (var i=0; i<res.length; i++) {
            //productlist.push(res[i].item_id+'. '+res[i].product_name+' ' +res[i].department_name+ ' $'+ res[i].price);
            productlist[i]=res[i].item_id+'. '+res[i].product_name+' $'+ res[i].price+ ' '+res[i].stock_quantity;
            console.log(productlist[i]);
            //console.log(productlist);
        }
    })
}

function addInv() {

    inquirer.prompt([{
        name: "productId",
        type: "input",
        message: "Add more"
     },
     {
        name: "unit",
        type: "input",
        message: "How many units you would like to add"
        // validate: function(value){}
     }]
    ) 
    .then(function (answer){
        connection.query("SELECT * FROM products WHERE item_id ="+answer.productId,function(err, res){
            if (err) throw err;
            
                 //update inventory
            var updatedInv = parseInt(res[0].stock_quantity) + parseInt(answer.unit);
            var sql = "UPDATE products SET stock_quantity = " +updatedInv+" WHERE item_id ="+answer.productId;
            connection.query(sql, function (err, result) {
                if (err) throw err;            
                console.log("Inventory added!");              
            });
        
        })
    });
}

function addProduct () {

    inquirer.prompt([
    {
        name: "productname",
        type: "input",
        message: "Product Name"
     },
     {
        name: "deptname",
        type: "input",
        message: "Department"
     },
     {
        name: "price",
        type: "input",
        message: "Sales Price"
     },
     {
        name: "inventory",
        type: "input",
        message: "Add Stock Quantity"
        // validate: function(value){}
     }]
    ) 
    .then(function (SKU){     
       //USE bamazon_DB; 
       var sql ="INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('"+ SKU.productname+"', '"+ SKU.deptname+"', " +SKU.price+', '+ SKU.inventory+")";
       console.log(sql);
       connection.query(sql, function(err, res){
        if (err) throw err;
        console.log("New Product Added!");
        })
    });
}

module.exports = managerView;