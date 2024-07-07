const express=require('express')


const color=require('@colors/colors')

const  morgan=require('morgan');

const dotenv=require("dotenv");
const mysqlPool = require('./config/db');
const { route } = require('./routes/studentRoutes');

// configure dotenv

dotenv.config();

// rest object

const app=express();

// middlewares..
app.use(express.json());

app.use(morgan('dev'));


//routes

// GET ALL STUDENTS LIST ||GET
app.use("/api/v1/student",require("./routes/studentRoutes"));


// GET STUDENT BY ID



app.get("/test",(req,res)=>
{
  res.status(200).send("Node js mysql App ji");
})

// port

const PORT=process.env.PORT||8000;
console.log("Hello");


// conditionaly listen...
mysqlPool.query('SELECT 1').then(()=>
{
  console.log("My sql db connected");
  app.listen(PORT,()=>
    {
      console.log(`server is running on port ${PORT}`.bgMagenta.white);
    })
}).catch((error)=>
{
  console.log(error);
})


// listen......

// morgan log the current endpoints 
