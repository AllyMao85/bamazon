




switch(process.argv[2]) {
    case "customer":
    var customerView = require("./bamazonCustomer").displayProducts;
    customerView;
    break;
    case "manager":
    var managerView = require("./bamazonManager");
    managerView;
    break;
    case "supervisor":
    var supervisorView = require("./bamazonsupervisor");
    supervisorView;
    break;
   
  }

