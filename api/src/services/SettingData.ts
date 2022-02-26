import axios from 'axios';
import config from 'config';
import {CharModel} from '../models/Char';
export default class {

    async fetchingCharsEndpoints() {
        try {
            let response = await axios.get(config.get<string>('books_api'));
            let data = response.data;
            let povCharacters: any = [];
            let allCharacters: any = [];
            let characters: any = [];
            let books: any = [];

            //data.forEach((povChar: any) => povCharacters.push(povChar.povCharacters));

            data.forEach(async (book: any) => {
                let povCharsInfo = await this.gettingDataOfPovChars(book.povCharacters);
                
                let formatedBook = {
                    name: book.name,
                    isbn: book.isbn,
                    authors: book.authors,
                    numberOfPages: book.numberOfPages,
                    publisher: book.publisher,
                    country: book.country,
                    mediaType: book.mediaType,
                    povCharacters: povCharsInfo
                };

                books.push(formatedBook);
            });
            //console.log(books);
            return books;

            /* povCharacters.forEach((char: any) => {if(char.length != 0) allCharacters.push(char)});
            allCharacters.forEach((listChars: any) => {listChars.forEach((char: any) => characters.push(char));});
            let groupChars = characters.filter((item: any, i: any) => characters.indexOf(item) === i);

            return groupChars; */
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private async gettingDataOfPovChars(povChars: any) {
        try {
            let data: Array<any> = [];

            for(let char in povChars) {
                let responseAPI = await axios.get(povChars[char]);
                data.push(responseAPI.data);
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async fetchingDataFromAllChars() {
        try {
            let endpointsChars = await this.fetchingCharsEndpoints();
            let data: Array<any> = [];

            for(let chat in endpointsChars) {
                let responseAPI = await axios.get(endpointsChars[chat]);
                data.push(responseAPI.data);
            }
            
            data.forEach(async (character: any) => {
                let isValid = await CharModel.findOne({name: character.name});
                let charAllegencies = await this.addingAllegiances(character.allegiances);

                let formatedChar = {
                    name: character.name,
                    gender: character.gender,
                    culture: character.culture,
                    born: character.born,
                    died: character.died,
                    title: character.title,
                    aliases: character.aliases,
                    father: character.father,
                    mother: character.mother,
                    spouse: character.spouse,
                    allegencies: charAllegencies,
                    povBook: character.povBook,
                    tvSeries: character.tvSeries,
                    playedBy: character.playedBy,
                };

                if(!isValid) await CharModel.create(formatedChar);
            });

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async addingAllegiances(allegiances: any) {
        try {
            let arrayAllegiances: Array<any> = [];

            for(let chat in allegiances) {
                let responseAPI = await axios.get(allegiances[chat]);
                arrayAllegiances.push(responseAPI.data);
            }

            return arrayAllegiances;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingAllCharsFromDb() {
        try {
            const Chars = await CharModel.find();
            return Chars;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingDetailsFromChar(id: string) {
        let data = await CharModel.findById(id);

        let details = {
            name: data.name,
            gender: data.gender,
            culture: data.culture,
            born: data.born,
            died: data.died,
            houses: data.allegencies,
            tvSeries: data.tvSeries,
            playedBy: data.playedBy
        };

        return details;
    }

    async gettingCovers() {
        try {
            let images = await axios.get('https://covers.openlibrary.org/b/id/240727-S.jpg');
            let apiImage = images.data;
            let imageConverted = apiImage.toString('base64');
            return imageConverted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}