const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/crud-opp");

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    image: String,
    age: Number,
    contact: String,
    email: String,
    profilelikes: {
        type: Number,
        default: 0
    },
});
    
module.exports = mongoose.model("user", userSchema);