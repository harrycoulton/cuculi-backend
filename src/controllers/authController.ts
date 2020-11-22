import {NextFunction, Request, Response} from 'express';
import {User, UserDocument} from '../models/user.model';
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
const jwt = require('jsonwebtoken');

export const login = async (req: Request, res: Response, next: NextFunction) => {
    await check("email", "Invalid email").isEmail().run(req);
    await check("password", "Password cannot be blank").isLength({min: 1}).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).send(errors);
    }
    const user = await User.findOne({ email: req.body.email }, async (err, user: any) => {
        if (err) {return next(err)};
        if (!user) {
            return res.status(404).send('No user with those credentials found');
        }
        const pwMatch = await bcrypt.compare(req.body.password, user.password);
        if (!pwMatch){
            return res.status(404).send('No user with those credentials found');
        }
        const token = user.generateAuthToken(user._id, user.email);
        user.tokens = user.tokens.concat({
            accessToken: token
        })
        await user.save();
        res.send({
            _id: user._id,
            email: user.email,
            token: token
        });
    });
}

export const logout = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const reqToken = req.header('Authorization').replace('Bearer ', '');
        // @ts-ignore
        const user = User.findById(req.user._id, async (err, user: UserDocument) => {
            user.tokens = user.tokens.filter((token) => {
                return token.accessToken !== reqToken;
            })
            await user.save();
        });
        res.send('Logged out')
    } catch (e) {
        res.status(500).send('Error logging out');
    }
}



