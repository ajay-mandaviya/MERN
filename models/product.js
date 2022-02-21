const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const productSchema =  new mongoose.Schema({
    name :{
        type : String,
        require: true,
        maxlength :32,
        trim :true,
    },
    decription :{
        type : String,
        require: true,
        maxlength :2000,
        trim :true,
    },
    price :{
       type : String ,
       require : true,
       maxlength : 32,
       trim : true,
    },
    category : {
        type :ObjectId,
        ref: 'Category',
        require : true,
    },
    stock:{
        type :Number
    },
    sold :{
        type :Number,
        default : 0,
    },
    photo :{
        data : Buffer,
        contentType : String,
    }
} , {timestamp : true})

module.exports =  mongoose.model("Product" , productSchema);