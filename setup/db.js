const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/NODEDB')
    .then(()=>console.log('MongoDB connected successfully'))
    .catch( (e)=>{console.log('error occured ',e.message)})

}