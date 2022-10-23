const { Schema, model } = require('mongoose');

// event Schema
// 
// Note, some entries for future readiness
// Not used: description, time, 
// 
const eventSchema = new Schema(
    {
        title: {
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