import multer from "multer";
import {Request} from "express";

export const imgUpload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!file.originalname.match(/\.(?:jpg|jpeg|gif|png)$/)){
            callback(new Error('Please upload a jpg, jpeg, or png file'));
        }
        callback(null, true);
    }
});