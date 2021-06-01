let db = require('../setting/connection')
let collection =require('../setting/collection');
const bcrypt = require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password =await bcrypt.hash(userData.password,10)
            db.get().collection(collection.userCollection).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
            })
            
    
        })
   
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = true
            let response = {}
            let user = await db.get().collection(collection.userCollection).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)

                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login failed")
                resolve({status:false})
            }
        })

    }
}