import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserDocument = mongoose.Document & {
    email: string;
    name: string;
    role: string;
    deleted: boolean;

    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    tokens: AuthToken[];

    comparePassword: comparePasswordFunction;
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
    passwordResetToken: String,
    passwordResetExpires: Date,


}, {timestamps: true});

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
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

const comparePassword: comparePasswordFunction = function (this: any, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);