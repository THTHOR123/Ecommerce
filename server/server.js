const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.listen(port,()=>{
    console.log("server is running");
})


app.get('/',(req,res)=>{
    res.json({msg:"This is example"});
})






//Routes
app.use('/user',require('./routes/useRoute'));
app.use('/api',require('./routes/categoryRouter'));
app.use('/api',require('./routes/productRouter'));


const uri = process.env.MONGODB_URL;

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err);
})