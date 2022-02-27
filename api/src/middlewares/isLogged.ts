import {Response, Request, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

const secret = config.get<string>('secret');

export default function (req: Request, res: Response, next: NextFunction) {
    let authToken = req.headers['authorization'];
    if(authToken) {
        const bearerToken = authToken.split(' ');
        const token = bearerToken[1];
        jwt.verify(token, secret, (err, decoded) => {
            if(err) res.status(406).json({msg: 'Invalid Token'});

            next();
        });
    } else {
        res.status(406).json({msg: 'Token not provided'});
    }
}