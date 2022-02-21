const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name :{
            type :String,
            trim : true,
            maxlength : 32,
            require : true,
            unique : true
    }

}, {timestamp : true})

module.exports = mongoose.model("Category" , categorySchema)