module.exports = app =>{
    const user = require("../controller/user.controller.js");
    // Create a new Customer
    app.post("/users", user.create);

    // Retrieve all Customers
    app.get("/users", user.findAll);

    // Retrieve a single Customer with customerId
    app.get("/users/:userid", user.findOne);

    // Update a Customer with customerId
    app.put("/users/:userId", user.update);

    // Delete a Customer with customerId
    app.delete("/users/:userId", user.delete);

    // Create a new Customer
    app.delete("/users", user.deleteAll);
}