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
  displayProducts();
  
  //connection.end();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    var productlist=[];
    for (var i=0; i<res.length; i++) {
        //productlist.push(res[i].item_id+'. '+res[i].product_name+' ' +res[i].department_name+ ' $'+ res[i].price);
        productlist[i]=res[i].item_id+'. '+res[i].product_name+' ' +res[i].department_name+ ' $'+ res[i].price;
        console.log(productlist[i]);
        //console.log(productlist);
    }
    purchase();
    //connection.end();
  })
}


function purchase() {
    inquirer.prompt([{
        name: "productId",
        type: "input",
        message: "Which product you would like to buy? please enter product id"
     },
     {
        name: "unit",
        type: "input",
        message: "How many units you would like to buy"
        // validate: function(value){}
     }]
    ) 
    .then(function (answer){
        connection.query("SELECT * FROM products WHERE item_id ="+answer.productId,function(err, res){
            if (err) throw err;
            //check inventory
            if (res.unit>res.stock_quantity) { 
                console.log("insufficient quantity!");
             } else {
                 var totalcost = answer.unit*res[0].price;
                 console.log("Total purchase value: "+totalcost);
                 //update sales
                 if (isNaN(res[0].product_sales)) {
                 var productsales=totalcost;
                 } else {
                 var productsales=res[0].product_sales+totalcost;    
                 }
                 //update inventory
                 var updatedInv = res[0].stock_quantity - answer.unit;
                 var sql = "UPDATE products SET stock_quantity = " +updatedInv+" WHERE item_id ="+answer.productId;
                 connection.query(sql, function (err, result) {
                 if (err) throw err;            
                 console.log("stockUpdated!");              
                 });
                 var sql2 = "UPDATE products SET product_sales = " +productsales+" WHERE item_id ="+answer.productId;
                 connection.query(sql, function (err, result) {
                 if (err) throw err;            
                 console.log("salesUpdated!");              
                 });
             }
        })
    });
    

}
 
module.exports = displayProducts;