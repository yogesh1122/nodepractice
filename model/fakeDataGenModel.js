const mongoose = require('mongoose');

const fkmodel = new mongoose.Schema({
    gender: {type:String},
    name: {
        title: { type:String },
        first: { type:String },
        last: { type:String },
      },
    location: {
        street: {
            name:{ type:String},
            number:{type:Number}
          },
      city:{ type:String },
      state:{ type:String },
      country: { type:String },
      postcode: { type:String },
      coordinates: {
        latitude: { type:Number },
        longitude: { type:Number },
      },
      timezone: {
        offset: { type:String },
        description: { type:String },
      }
    },
    email: { type:String },
    dob: {
        date: { type:Date },
        age: { type:Number },
      },
    registered: {
        date:{ type:Date },
        age: { type:Number },
      },
    phone: { type:String },
    cell: { type:String },
   // id: { name: { type:String }, value: { type:String } },
    picture: {
      large: { type:String },
      medium: { type:String },
      thumbnail: { type:String }
    },
    nat: { type:String },
    salary :{  type: Number}

})  

const fakeAPIModel = mongoose.model('fakeAPI', fkmodel)

module.exports = { fakeAPIModel }