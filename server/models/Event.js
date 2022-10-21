const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        cost: {
            type: Number
        },
        date: {
            type: Number,
        },
        time: {
            type: String
        }
    });

module.exports = eventSchema;