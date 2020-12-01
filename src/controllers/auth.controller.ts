import {NextFunction, Request, Response} from 'express';
import {User, UserDocument} from '../models/user.model';
import { check, validationResult } from "express-validator";
import {transport} from '../app';
import bcrypt from "bcryptjs";

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
        const token = user.generateAuthToken(user._id, user.email, '24h');
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

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({email: req.body.email}, async (err, user: any) => {
        if (err) {return next(err);}
        if (!user){
            return res.status(404).send({Error: 'No user with that email address found'});
        }
        user.passwordResetToken = user.generateAuthToken(user._id, user.email, '2h');
        await user.save();
        const message = {
            from: 'noreply@cuculirecords.com', // Sender address
            to: req.body.email,         // List of recipients
            subject: 'Password Reset Link', // Subject line
            html: 'Forgot your password? <a href="hebish.123/reset-password/'+user.passwordResetToken+'">Click this link</a>' // Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
                res.status(404).send('No user with that email found');
            } else {
                res.send('A reset password link has been emailed to you');
            }
        });
    });
}

export const passwordReset = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({passwordResetToken: req.body.token}, async (err, user: UserDocument) => {
        if (err) {
            return next(err);
        }
        if (!user){
            return res.status(400).send({Error: "User not found"});
        }
        if (req.body.password !== req.body.passwordConfirmation){
            return res.status(500).send({Error: "Passwords do not match"});
        }
        user.password = req.body.password;
        console.log(user);
        await user.save();
        return res.send({Success: 'Password successfully updated'});
    });

}



