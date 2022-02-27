import UserService from "../services/UserService";

const userService = new UserService();

export default class {
    async authenticate(user: any) {
        try {
            let token = await userService.authenticate(user);
            return (token) ? {token: token} : {msg: 'Email or Password invalid'};
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create(user: any) {
        try {
            let isValid = await userService.findByEmail(user.email);
            if(!isValid) {
                await userService.createUser(user);
                return {msg: 'User registered'};
            } 

            return {msg: 'Email already registered'};
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async showAll() {
        try {
            let users = await userService.showAll();
            return (users.length != 0) ? users : {msg: 'There is no users registered'}
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}