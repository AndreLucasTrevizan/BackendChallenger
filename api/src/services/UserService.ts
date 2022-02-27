import {UsersModel} from '../models/User';
import config from 'config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = config.get<string>('secret');

export default class {
    async authenticate(user: any) {
        try {
            let userDB = await UsersModel.findOne({email: user.email});
            if(userDB) {
                if(bcrypt.compareSync(user.password, userDB.password)) {
                    return jwt.sign(user, secret, {expiresIn: '24h'});
                }
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createUser(user: any) {
        try {
            let newUser = {
                name: user.name,
                email: user.email,
                password: bcrypt.hashSync(user.password, 15)
            }

            await UsersModel.create(newUser);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findByEmail(email: string) {
        try {
            return UsersModel.findOne({email: email});
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async showAll() {
        try {
            return await UsersModel.find();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}