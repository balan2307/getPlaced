const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const cors=require('cors');


// const User=require('../models/User')
const app=express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const PORT=process.env.PORT || 3000;
const DB='mongodb+srv://esakki:Esakki2001@cluster0.rzlyho4.mongodb.net/getPlaced?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(DB).then(()=>{
    console.log("Connection successful");
}).catch((err)=>console.log(err,"No connection"))


const InitRoutes=require('./routes/index');
InitRoutes(app);

app.listen(PORT ,()=>{
    console.log(`server started on PORT ${PORT}`)
})