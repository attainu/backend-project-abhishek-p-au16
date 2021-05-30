let db = require('../setting/connection')
const collection = require('../setting/collection');

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
    }
}