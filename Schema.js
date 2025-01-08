const { default: mongoose } = require('mongoose')
// const mongoose=require('moongoose')

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }
})

const menu=mongoose.model('menu',menuSchema)
module.exports=menu