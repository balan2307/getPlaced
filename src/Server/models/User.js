const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:String,
    username:{
        unique:true,
        type:String
    },
    email:{
        unique:true,
        type:String
    }
        ,
    password:String,
    college:String,
    university:String,
    yearofgrad:String
    
})

const User=mongoose.model('User',userSchema);
module.exports=User;