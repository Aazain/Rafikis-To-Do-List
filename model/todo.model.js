const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: String
})
const Items = mongoose.model("Items", listSchema)


module.exports = Items;


