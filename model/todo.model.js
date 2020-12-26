const mongoose = require('mongoose');

module.exports = (app) => {
const listSchema = new mongoose.Schema({
    name: String
})
const Items = mongoose.model("Items", listSchema)
}


