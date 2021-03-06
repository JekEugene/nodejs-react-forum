const mongoose = require("mongoose")
const { Schema } = require("mongoose")
ObjectId = Schema.Types.ObjectId

const schema = new Schema({
    user_id: ObjectId,
    user_name: String,
    title: String,
    text: String,
    date: Date,
})

const Post = mongoose.model('posts', schema);

module.exports = Post