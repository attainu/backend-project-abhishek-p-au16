let db = require('../setting/connection')
let collection =require('../setting/collections');
const bcrypt = require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password =await bcrypt.hash(userData.password,10)
            db.get().collection(collection.userCollection).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
            })
            
    
        })
   
    }
}