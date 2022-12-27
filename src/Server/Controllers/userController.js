const bcrypt = require("bcrypt");
const User=require('../models/User')
const jwt = require('jsonwebtoken');

module.exports.loginUser=async(req,res,next)=>{
    const{email,password}=req.body;
    console.log(("Password received"))
 
     User.findOne({email},(err,user)=>{
         if(err) return res.status(500).json({
             title:"server error",
             error:err
         })
 
         if(!user){
             return res.status(401).json({
                 title: 'user not found',
                 error: 'invalid credentials'
 
             })
         }
         if (!bcrypt.compareSync(password, user.password)) {
             return res.status(401).json({
               title: 'login failed',
               error: 'invalid credentials'
             })
           }

           let token = jwt.sign({ userId: user._id}, 'secretkey');
         
           return res.status(200).json({
             title: 'login success',
             token,
             uid:user._id

           })
 
 
     })
}


module.exports.RegisterUser=async(req,res,next)=>{
    const {email,username,password}=req.body;
    const newUser=new User({
        email,
        username,
        password:bcrypt.hashSync(password, 10)
    })
   
    newUser.save(err => {
        if (err) {
            console.log("error type",err)
          return res.status(400).json({
            title: 'error',
            error: 'email in use'
          })
        }
        return res.status(200).json({
          title: 'signup success'
        })
      })
   
    console.log("Register request received",newUser)
}


module.exports.getAllUsers=async(req,res,next)=>{
    const users=await User.find({email:'thevarbalan32@gmail.com'});
    console.log("testing",users)
    return res.status(200).json({
      title: 'Test success'
    })
    // return users

}