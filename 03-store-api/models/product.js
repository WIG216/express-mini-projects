const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"],
    },

    price: {
        type: Number,
        required: [true, "product price must be provided"],
    },

    featured: {
        type: Boolean,
        default: false,
    },

    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            meessage: '{VALUE} is not supported'
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcos']
    },

    rating: {
        type: Number,
        default: 4.1
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)