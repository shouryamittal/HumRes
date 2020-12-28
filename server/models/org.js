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
        required: false
    }
});

const Organisation = mongoose.model("Organisation", OrgSchema);
module.exports = Organisation;