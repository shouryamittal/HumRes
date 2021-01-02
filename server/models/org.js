const {mongoose, Schema} = require("./abstractModel");

const OrgSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    urlTxt: {
        type: String,
        required: true
    },
    departments: {
        type:[String],
        required: false,
        default:[]
    },
    address: {
        type: String,
        required: false,
        default: ""
    },
    owner: {
        type: String,
        required: false,
        default:""
    },
    contact: {
        type: [String],
        required: false,
        default:[]
    },
    totalEmployees: {
        type: Number,
        required: false,
        default:0
    }
});
//TODO: input validations
const Organisation = mongoose.model("Organisation", OrgSchema);
module.exports = Organisation;