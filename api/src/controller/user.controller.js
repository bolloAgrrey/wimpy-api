import User from '../models/User';
import Login from '../models/Login';
import password from '../security/PasswordHash';

// Create and Save a new User
exports.create = (req, res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    
    const user = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        userName:req.body.user_name
    };   
    User.create(user,(err,data)=>{
        if(err){
          res.status(500).send({
              message: err.message || "Some error occurred while saving User."
          })
        }else{ 
            const userid =data.id;
            const login = {
              userName:req.body.user_name,
              ...password.sha512(req.body.password),
              relatedUserID:userid
            }
            Login.create(login,(err1,dat)=>{
              if(err1){
                res.status(500).send({message: err1.message || "Some error occurred while saving User login."});
              }else{
                console.log("login",dat);
                res.json({...data,"loginID":dat.id});
              }
            })
      }
    });
}
// Retrieve all users from the database.
exports.findAll = (req, res) => {

 const result = (err,data)=>{
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });}
        else {res.send(data);}
     };
  User.getAll(result);
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    const result = (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.userid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.userid
          });
        }
      } else res.send(data);
    }
    User.findById(req.params.userid,result);
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const results = (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id " + req.params.userId
        });
      }
    } else res.send(data);
  }
  User.updateById(req.params.userId,req.body,results);
}

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
}

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
}