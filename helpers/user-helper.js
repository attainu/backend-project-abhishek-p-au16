let db = require('../setting/connection')
let collection =require('../setting/collection');
const bcrypt = require('bcrypt');
let objectId = require('mongodb').ObjectID;
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

    },
    addToCart:(proId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.cartCollection).findOne({user:objectId(userId)})
            if(userCart){
                db.get().collection(collection.cartCollection).updateOne({user:objectId(userId)},
                {
                 
                        $push:{products:objectId(proId)}
                
                }
                ).then((respnse)=>{
                    resolve()
                })
                

            }else{
                let cartObj={
                    user:objectId(userId),
                    products:[objectId(proId)]
                }
                db.get().collection(collection.cartCollection).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })

    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems = await db.get().collection(collection.cartCollection).aggregate([
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $lookup:{
                        from:collection.productCollection,
                        let:{prodList:'$products'},
                        pipeline:[
                            {
                               $match:{
                                   $expr:{
                                       $in:['$_id',"$$prodList"]
                                   }
                               } 
                            }
                        ],
                        as:'cartItems'
                    }
                }

            ]).toArray()
            resolve(cartItems[0].cartItems)
        })
    }
}         