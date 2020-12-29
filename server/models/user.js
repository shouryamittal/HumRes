const {mongoose, Schema} = require("./abstractModel");

const UserSchema = new Schema({
    orgId: {
        type: String,
        required: true
    },
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
    contact: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin","hr","emp"],
        required: true
    },
    sex: {
        type: String,
        required: false
    },
    businessUnit: {
        type: String,
        required: false
    },
    salary: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});
//TODO: input validations
//instance method, available for each User instance.
UserSchema.methods.fullName = function () {
    return (this.firstName + " " + this.lastName);
}

const User = mongoose.model("User", UserSchema);
module.exports = User;