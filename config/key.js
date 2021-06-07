if(process.env.NODE_ENV=="producton"){
    modulw=e.exports = exports=require("./prod")
}else{
    module.exports =require("./dev")
}