const express=require("express");
const errorHandler = require("./middleware/errorHandlers");
const connectDb = require("./config/dbConnections");
const dotenv = require("dotenv").config();

connectDb()
const app=express();
const port=process.env.PORT ||5000;

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRouter"))
app.use(errorHandler);

app.listen(()=>{
    console.log(`port iss set to ${port}`)
})