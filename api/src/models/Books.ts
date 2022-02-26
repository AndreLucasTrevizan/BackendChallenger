import {model, Schema} from 'mongoose';

const bookSchema = new Schema({
    name: {type: String},
    isbn: {type: String},
    authors: {type: Array},
    numberOfPages: {type: Number},
    publisher: {type: String},
    country: {type: String},
    mediaType: {type: String},
    povCharacters: {type: String},
});

export const BookModel = model('Books', bookSchema);