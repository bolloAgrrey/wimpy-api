import connection from '../db/db';

export default class Login{
    constructor(userName,passwordSalt,passwordHash,relatedUserId){
        this.userName = userName;
        this.passwordSalt = passwordSalt;
        this.passwordHash = passwordHash;
        this.relatedUserId = relatedUserId;
        this.id = 0;
    }
    static create(param,result){
        const {userName,passwordSalt,passwordHash,relatedUserId} = param;

        connection.query("INSERT INTO logins SET ?",[param],(err,data)=>{
            if(err){
                console.log("error:",err.sqlMessage);

                result(err,null);
                return;
            }
            console.log("Login created:",{ id: data.insertId, ...param});
            result(null,{ id: data.insertId, ...param });
        });
    }
}