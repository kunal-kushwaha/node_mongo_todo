const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let todoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', todoSchema);    // mongodb will change this Todo to todos
// this Todo is a collection
