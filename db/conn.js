const mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => callback());
    },
 
  getDb: function () {
    return _db;
  },


};