import express, {Request, Response} from 'express';

import SettingData from '../services/SettingData';

const router = express.Router();

const settingData = new SettingData();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({msg: 'Ook usando o router file'});
});

router.get('/data', async (req: Request, res: Response) => {
    let APIdata = await settingData.fetchingCharsEndpoints();
    res.status(200).json(APIdata);
});

router.get('/chars', async (req: Request, res: Response) => {
    let chars = await settingData.gettingAllCharsFromDb();
    res.status(200).json(chars);
})

router.get('/char/:id', async (req: Request, res: Response) => {
    let chars = await settingData.gettingDetailsFromChar(req.params.id);
    res.status(200).json(chars);
});

router.get('/covers', async (req: Request, res: Response) => {
    let covers = await settingData.gettingCovers();
    res.status(200).json(covers);
});

export default router;