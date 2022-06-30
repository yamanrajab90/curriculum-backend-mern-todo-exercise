import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import keys from "../config/keys";
import User from "../models/user";
export interface TokenInterface {
           email: string;
  
  }
//   export interface User {
//     "type": User
//  }

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send('no token provided');

        //TODO: FIX "any" here too.
        const decoded = jwt.verify(token, keys.SECRET_KEY) as TokenInterface;

        const user = await User.findOne({email: decoded.email});
        if (!user) return res.status(401).send('no such a user');

        // req.User = User;

        next();
    } catch (err) {
        res.status(401).send('authentication failed!');
    }
};