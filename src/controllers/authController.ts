import {NextFunction, Request, Response} from 'express';
import {User, UserDocument} from '../models/user.model';
import { check, validationResult } from "express-validator";
import passport from "passport";
import {IVerifyOptions} from "passport-local";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    await check("email", "Invalid email").isEmail().run(req);
    await check("password", "Password cannot be blank").isLength({min: 1}).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(500).send(errors);
    }
    passport.authenticate("local", async (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            return res.status(404).send('Unsuccessful login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            const token = user.generateAuthToken(user._id, user.email);
            user.tokens = user.tokens.concat({
                accessToken: token
            });
            user.save();
            console.log(token);
            return res.json({
                user: {
                    _id: user._id,
                    email: user.email,
                    token: token
                }
            }) ;
        });
    })(req, res, next);
}



