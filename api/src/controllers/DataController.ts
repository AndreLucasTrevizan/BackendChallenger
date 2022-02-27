import DataService from "../services/DataService";

const dataService = new DataService();

export default class {

    async loadingBooksData() {
        try {
            await dataService.fetchingDataFromBooks();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async showingBooks() {
        try {
            return await dataService.showingBooks();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingCoverFromBook() {
        try {
            return await dataService.gettingCoverFromBook();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingInfoFromAllChars() {
        try {   
            return await dataService.gettingInfoFromAllChars();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAllPovChars() {
        try {
            return await dataService.getAllPovChars();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingDetailsFromChar(id: string) {
        try {
            return await dataService.gettingDetailsFromChar(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async gettingAllBooksFromAChar(data: any) {
        try {
            return await dataService.gettingAllBooksFromAChar(data.name);
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }
}