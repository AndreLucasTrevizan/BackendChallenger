import {model, Schema} from 'mongoose';

const usersSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
});

export const UsersModel = model('Users', usersSchema);