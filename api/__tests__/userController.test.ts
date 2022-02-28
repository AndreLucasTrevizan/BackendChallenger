import UserController from "../src/controllers/UserController";

const userController = new UserController();

describe('Testing User Functions', () => {
    test('Create new user', async () => {
        let user = {
            name: 'Usuário Teste',
            email: 'usuario@teste.com',
            password: 'minhasenhateste'
        };
    
        let response = await userController.create(user);
        expect(response.msg).toBe('User registered');
    });
    
    test('Create new user with same email', async () => {
        let user = {
            name: 'Usuário Teste',
            email: 'usuario@teste.com',
            password: 'minhasenhateste'
        };
    
        let response = await userController.create(user);
        expect(response.msg).toBe('Email already registered');
    });
});