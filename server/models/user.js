const {mongoose, Schema} = require("./abstractModel");
const bcrypt = require("bcrypt");

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
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["admin","hr","emp"],
        required: true
    },
    isAdmin :{
        type: Boolean,
        required: true
    },
    manages: {
        type: [String],
        required:false,
        default:null
    },
    manager: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    title: {
        type: String,
        required: false,
        default: ""
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
    },
    contact: {
        type: String,
        required: false
    },
    sex: {
        type: String,
        required: false
    }
    
});
//TODO: input validations

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT_ROUND));
    const hashedPassword = await bcrypt.hash(this.password || "", salt);
    try {
        this.password = hashedPassword;
    }
    catch(e) {
        next(e);
    }
});

//instance method, available for each User instance.
UserSchema.methods.fullName = function () {
    return (this.firstName + " " + this.lastName);
}

const User = mongoose.model("User", UserSchema);
module.exports = User;