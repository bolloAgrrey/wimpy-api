import connection from '../db/db';
class User{
    constructor(firstName,lastName,userName){
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.id = 0;
    }
   static create(param,result){
         const {firstName,lastName,userName} = param;
        connection.query("INSERT INTO users SET ?",[param],(err,data)=>{
            if (err) {
                console.log("error: ", err.sqlMessage);
                result(err, null);
                return;
              }
          
              console.log("created user: ", { id: data.insertId, ...param});
              result(null, { id: data.insertId, ...param });           
        });
    }
    static findById(userId,result){
        connection.query("SELECT * FROM users WHERE userid = ?",[userId],(err,data)=>{
            if(err){
                console.log("error :", err.sqlMessage);
                result(null,err);
                return;
            }
            if(data.length){
                console.log("user found: ", data[0]);
                result(null,data[0]);
                return;
            }
            result({fail_message: 'user not found'},null);
        });
    }
    static getAll(result){

        connection.query("SELECT * FROM users", (err, data) => {
          if (err) {
            console.log("error: ", err.sqlMessage);
            result(null, err);
            return;
          } 
          console.log("#Users>>>>>");     
          console.table(data);
          result(null, data);
        });
    }      
    static updateById(id, user, result){

      const {firstName,lastName,userName} = user;
        connection.query(
          "UPDATE users SET firstName = ?, lastName = ?, userName = ? WHERE userid = ?",
          [firstName,lastName,userName, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err.sqlMessage);
              result(null, err);
              return;
            }
      
            if (res.affectedRows == 0) {
              // not found Customer with the id
              result({ status: "user not_found" }, null);
              return;
            } 
      
            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
          }
        );
      }      
    static remove (userid, result){

        connection.query("DELETE FROM users WHERE userid = ?", [userid], (err, res) => {
          if (err) {
            console.log("error: ", err.sqlMessage);
            result(null, err);
            return;
          }      
          if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ status: "user not_found" }, null);
            return;
          }      
          console.log("deleted user with id: ", userid);
          result(null, res);
        });
      }      
    static removeAll(result){
        connection.query("DELETE FROM users", (err, res) => {
          if (err) {
            console.log("error: ", err.sqlMessage);
            result(null, err);
            return;
          }
      
          console.log(`deleted ${res.affectedRows} users`);
          result(null, res);
        });
    }    
}
module.exports = User;