import {Schema, model} from 'mongoose'; 

const artSchema = new Schema({
    title: String,
    artist: String,
    department: String,
    imageUrl: String

});

const ArtModel = model('Art', artSchema, 'art')

export {ArtModel}