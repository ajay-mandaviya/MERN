require("dotenv").config();
const mongoose  = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser  =  require("body-parser");


// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

// db connection

const app  = express();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
}).then(()=>{
    console.log("Db connected");
});

// middleware


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());

// My Routes

app.use("/api" , authRoutes); 
app.use("/api" , userRoutes)
app.use('/api' , categoryRoutes)
app.use('/api' , productRoutes)
app.use('/api' , orderRoutes)
// Port
const port = 8000;
app.listen(port , ()=>{ 
    console.log("connected to  8000");
    console.log("now working");
})
