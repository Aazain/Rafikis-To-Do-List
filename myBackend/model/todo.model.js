const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: String,
    status: Boolean
},{timestamps: true})
const Items = mongoose.model("Items", listSchema)


module.exports = Items;