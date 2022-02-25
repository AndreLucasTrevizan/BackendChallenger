import express, {Request, Response} from 'express';

import SettingData from '../services/SettingData';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({msg: 'Ook usando o router file'});
});

router.get('/data', async (req: Request, res: Response) => {
    let settingData = new SettingData();
    let APIdata = await settingData.fetchingData();
    
    res.status(200).json(APIdata);
});

export default router;