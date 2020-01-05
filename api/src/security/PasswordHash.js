import Crypto from 'crypto';
class HashPassword{
    randomSalt(){

        return Crypto.randomBytes(Math.ceil(16/2))
        .toString('hex')
        .slice(0,16);
    }
    static sha512(password){

      var  krypto = new HashPassword();
        const salt = krypto.randomSalt();
        let hash = Crypto.createHmac('sha512',salt);
        hash.update(password);
        const value = hash.digest('hex');
        return {
            passwordSalt :salt,
            passwordHash:value 
        }
    }
    static comparePasswordHash(salt,password){
        let hash = Crypto.createHmac('sha512',salt);
        hash.update(password);
        const value = hash.digest('hex');
        return{
            passwordHash:value
        }
    }
}
module.exports = HashPassword;