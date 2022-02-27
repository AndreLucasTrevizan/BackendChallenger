import express, {Request, Response} from 'express';

import DataController from '../controllers/DataController';
import UserController from '../controllers/UserController';

import isLogged from '../middlewares/isLogged';

const router = express.Router();

const dataController = new DataController();
const userController = new UserController();

router.post('/users', async (req: Request, res: Response) => {
    let result = await userController.create(req.body);
    res.status(201).json(result);
});

router.post('/sign_in', async (req: Request, res: Response) => {
    let result = await userController.authenticate(req.body);
    res.status(200).json(result);
});

router.get('/books', isLogged, async (req: Request, res: Response) => {
    let result = await dataController.showingBooks();
    res.status(200).json(result);
});

router.post('/books/char', isLogged, async (req: Request, res: Response) => {
    let result = await dataController.gettingAllBooksFromAChar(req.body);
    res.status(200).json(result);
});

router.get('/cover', async (req: Request, res: Response) => {
    let result = await dataController.gettingCoverFromBook();
    res.status(200).json(result);
});

router.get('/chars', isLogged, async (req: Request, res: Response) => {
    let result = await dataController.getAllPovChars();
    res.status(200).json(result);
});

router.get('/char/:id', isLogged, async (req: Request, res: Response) => {
    let result = await dataController.gettingDetailsFromChar(req.params.id);
    res.status(200).json(result);
});

export default router;