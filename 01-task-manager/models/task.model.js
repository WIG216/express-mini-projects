const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = Schema({
    name: {
        type: String,
        required: [true, 'must provide name']
    },
    completed: {
        type: Boolean,
    }
})

module.exports = mongoose.model('Task', TaskSchema)  