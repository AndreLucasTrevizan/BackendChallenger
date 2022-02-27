import axios from 'axios';
import config from 'config';
import {CharModel} from '../models/Char';
import {BookModel} from '../models/Books';
export default class {

    async fetchingDataFromBooks() {
        try {
            let response = await axios.get(config.get<string>('books_api'));
            let data = response.data;
            let allBooks: any = [];

            for(let book in data) {
                let infoChar = await this.gettingDataOfPovChars(data[book].povCharacters);
                let bookCover = await this.gettingCovers();

                let newBook = {
                    cover: bookCover,
                    name: data[book].name,
                    isbn: data[book].isbn,
                    authors: data[book].authors,
                    numberOfPages: data[book].numberOfPages,
                    publisher: data[book].publisher,
                    country: data[book].country,
                    mediaType: data[book].mediaType,
                    povCharacters: infoChar
                };

                await BookModel.create(newBook);
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async showingBooks() {
        try {
            return await BookModel.find();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingCoverFromBook() {
        try {
            let book = await BookModel.findOne({name: 'A Game of Thrones'});
            return book.cover;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingInfoFromAllChars() {
        try {
            let response = await axios.get(config.get<string>('books_api'));
            let data = response.data;

            let povCharacters: any = [];

            for(let book in data) {
                povCharacters.push(data[book].povCharacters);
            }

            let allChars: any = [];

            for(let povChar in povCharacters) {
                povCharacters[povChar].forEach((char: any) => allChars.push(char));
            }
            
            //Filtrando a lista de endpoints de povChars
            let chars = allChars.filter((char: any, i: any,) => allChars.indexOf(char) === i);

            let infoChars = await this.gettingDataOfPovChars(chars);

            infoChars.forEach(async (character: any) => {
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

    async getAllPovChars() {
        try {
            return await CharModel.find();
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

    async gettingAllBooksFromAChar(name: string) {
        try {
            let allBooks = await this.showingBooks();
            let povCharsFromEachBook: any = [];
            let bookFromSelectedChar: any = [];
            for(let book in allBooks) {
                povCharsFromEachBook.push(allBooks[book].povCharacters);
                for(let chars in povCharsFromEachBook) {
                    povCharsFromEachBook[chars].forEach((char: any) => {
                        if(char.name === name) bookFromSelectedChar.push(allBooks[book]);
                    });
                }
            }

            return bookFromSelectedChar;
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }
}