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

app.listen(port, async () => {
    console.log(`App rodando na porta ${port}`);
});