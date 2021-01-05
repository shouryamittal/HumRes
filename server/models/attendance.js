/**
 * Filename: attendance.js
 * Description : This file contains the schema for attendance collection
 */

const {mongoose, Schema} = require("./abstractModel");

//in this table we'll only store the entry when user is absent.
const AttendanceSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    BUId: {
        type: String,
        required: false //for now its false
    },
    isAbsent: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        required: true
    }
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;