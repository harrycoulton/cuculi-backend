import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const jwt = require('jsonwebtoken');

export type UserDocument = mongoose.Document & {
    email: string;
    name: string;
    role: string;
    deleted: boolean;

    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    tokens: AuthToken[];

    generateAuthToken: generateAuthTokenFunction;
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    tokens: {
        type: Array,
        default: []
    },
    passwordResetToken: String,
    passwordResetExpires: Date,


}, {timestamps: true});

type generateAuthTokenFunction = (id: String, email: String, expiry: String) => string;

export interface AuthToken {
    accessToken: string;
}

/**
 * Middleware to hash password
 */

userSchema.pre("save", function save(next){
    const user = this as UserDocument;

    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(8, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
            if (err) {return next(err) ;}
            user.password = hash;
            next();
        });
    });
});

const generateAuthToken: generateAuthTokenFunction = function (id: String, email: String, expiry: String) {
    return jwt.sign( { _id: id, email: email }, process.env.APP_KEY, { expiresIn: expiry} );
}

userSchema.methods.generateAuthToken = generateAuthToken;

export const User = mongoose.model<UserDocument>("User", userSchema);