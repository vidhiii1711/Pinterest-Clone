const mongoose = require("mongoose");
const pln=require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/pintrest");
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  boards: {
    type: Array,
    default: [],
  },
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"post"
    }
  ],
  profileImage: String,
});
userSchema.plugin(pln);

module.exports = mongoose.model("user", userSchema);
