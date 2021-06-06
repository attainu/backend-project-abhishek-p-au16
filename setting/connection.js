const mongoClient = require("mongodb").MongoClient
const state ={
    db:null
}

module.exports.connect = function(done){
    const url='mongodb+srv://abhishek:attainu2021@cluster0.zmld7.mongodb.net/Grocerystore?retryWrites=true&w=majority'
    const dbname = "Grocerystore"

    mongoClient.connect(url,{useUnifiedTopology:true},(err,data)=>{
        if(err) return err
        state.db = data.db(dbname)
    })
    done()

 }

module.exports.get = ()=>{
    return state.db
}
