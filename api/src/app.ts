import express, {Request, Response} from 'express';
import config from 'config';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

import router from './routes/router';

app.use('/api', router);

const port = config.get<number>('port');

import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:27017/backend');

import DataController from './controllers/DataController';

const dataController = new DataController();

app.listen(port, async () => {
    try {
        await dataController.loadingBooksData();
        await dataController.gettingInfoFromAllChars();

        console.log(`App rodando na porta ${port}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
});