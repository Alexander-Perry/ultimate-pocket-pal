const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const eventSchema = require('./Event');

// user model schema
// Name not currently referenced, but ready for future use
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
        id: true
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


const User = model('User', userSchema);
module.exports = User;
