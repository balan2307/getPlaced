


const adminRouter=require('./user')
const testRouter=require('./test')
const auth = require("../middleware/auth");

const InitRoutes = (app) => {

    

  app.use("/", adminRouter);
  app.use('/test',auth,testRouter)
  console.log("Routes Initialized Successfully")


}


module.exports=InitRoutes;

// app.listen(PORT ,()=>{
//     console.log(`server started on PORT ${PORT}`)
// })