let db = require('../setting/connection')
const collection = require('../setting/collection');
let objectId = require('mongodb').ObjectID

module.exports={
    addproduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products= await db.get().collection(collection.productCollection).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.productCollection).removeOne({_id:objectId(proId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.productCollection).findOne({_Id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.product).updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    description:proDetails.description,
                    price:proDetails.price,
                    catagory:proDetails
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}