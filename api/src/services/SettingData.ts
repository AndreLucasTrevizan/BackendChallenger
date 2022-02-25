import axios from 'axios';
import config from 'config';

export default class {

    async fetchingData() {
        let api = config.get<string>('books_api');

        let response = await axios.get(api);

        let data = response.data;
        let povCharacters: any = [];
        let mainCharacters: any = [];
        data.forEach((povChar: any) => povCharacters.push(povChar.povCharacters));
        povCharacters.forEach((char: any) => {
            if(char.length != 0) mainCharacters.push(char);
        })
        let plag: any = [];
        mainCharacters.forEach((listChars: any) => {
            listChars.forEach((char: any) => plag.push(char));
        });

        let newPlat = plag.filter((item: any, i: any) => plag.indexOf(item) === i);

        return newPlat;
    }

}