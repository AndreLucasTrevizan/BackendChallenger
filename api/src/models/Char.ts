import {model, Schema} from 'mongoose';

const charSchema = new Schema({
    name: {type: String},
    gender: {type: String},
    culture: {type: String},
    born: {type: String},
    died: {type: String},
    title: {type: Array},
    aliases: {type: Array},
    father: {type: String},
    mother: {type: String},
    spouse: {type: String},
    allegencies: {type: Array},
    povBook: {type: Array},
    tvSeries: {type: Array},
    playedBy: {type: Array},
}, {timestamps: true});

export const CharModel = model('Char', charSchema);