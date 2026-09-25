const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        stdId: {
            type: String,
            required: [true, 'Student ID is required'],
            unique: true,
            trim: true,
        },

        name: {
            type: String,
            required: [true, 'User name is required'],
            trim: true,
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
        },

        role: {
            type: String,
            enum: ['student', 'staff', 'admin'],
            required: [true, 'Role is required'],
            default: 'student',
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;