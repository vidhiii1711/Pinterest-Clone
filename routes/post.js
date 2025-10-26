const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pintrest");
const postSchema = mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  title: String,
  description: String,
  image: String
});


module.exports = mongoose.model("post", postSchema);
