// imports to create a schema/model
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// create posts schema -- // moved from app.js //
const PostsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Name is required!']
    },
    Age: {
        type: Number,
        required: [true, 'Age is required!']
    },
    City: {
        type: String,
        required: [true, 'City is required!']
    }
});

module.exports = mongoose.model('users', PostsSchema);