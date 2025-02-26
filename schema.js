const mongoose = require('mongoose')

const  userSchema = new mongoose.Schema({
    name:{type:String ,require:true},
    description: {type:String},
    price: {type:Number, require:true }
});

module.exports = mongoose.model('User', userSchema);
