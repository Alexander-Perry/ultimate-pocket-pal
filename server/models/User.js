const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const eventSchema = require('./Event');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        budget: {
            type: Number
        },
        events: [eventSchema]       
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash the password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
// get the number of events saved
// userSchema.virtual('eventCount').get(function () {
//     return this.events.length;
// });

const User = model('User', userSchema);
module.exports = User;
