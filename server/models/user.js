const { mongo, MongooseDocument } = require("../db/connection");
const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
});

//instance method, available for each User instance.
UserSchema.methods.fullName = function () {
    return (this.firstName + " " + this.lastName);
}

const User = mongoose.model("User", UserSchema);
module.exports = User;