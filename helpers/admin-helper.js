let db = require('../setting/connection')
let collection =require('../setting/collection');
const bcrypt = require('bcrypt');
let objectId = require('mongodb').ObjectID;

module.exports={
    doSignup:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            adminData.password =await bcrypt.hash(adminData.password,10)
            db.get().collection(collection.adminCollection).insertOne(adminData).then((data)=>{
                resolve(data.ops[0])
            })
            
    
        })
   
    },
    doLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = true
            let response = {}
            let admin = await db.get().collection(collection.adminCollection).findOne({email:adminData.email})
            if(admin){
                bcrypt.compare(adminData.password,admin.password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.admin=admin
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