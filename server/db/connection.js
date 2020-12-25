const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log(`SUCCESS: DB Connection Successful`))
    .catch((cause) => console.log(`FAILURE: ${cause}`));

module.exports = mongoose;