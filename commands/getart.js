import {SlashCommandBuilder} from "discord.js";
import {ArtModel} from '../schemas/art.js';
import departments from "../data/departments.json" with { type: "json"};
import superagent from "superagent";


const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

export const data = new SlashCommandBuilder()
    .setName('getart')
    .setDescription('gets a random piece of art from a chosen department and keyword')
    .addStringOption(option =>
        option
        .setName('department')
        .setDescription('which department to choose from')
        .setAutocomplete(true)
        .setRequired(true))
    .addStringOption(option =>
        option
        .setName('keyword')
        .setDescription('what to search for')
        .setRequired(true));



export async function execute(interaction){
    const department = interaction.options.getString('department');
    const dept = departments.find((d) => d.id === parseInt(department));
    const keyword = interaction.options.getString('keyword');
    const selectedArt = await randomArt(dept.id, keyword);
    if(Object.keys(selectedArt).length === 0){
        await interaction.reply(`No results for keyword: ${keyword} in the department of ${dept.name}.`);
    }
    else{
        interaction.reply(`Title: ${selectedArt.title} \n Artist: ${selectedArt.artist} \n ${selectedArt.imageUrl}`);
    }
    
}

async function randomArt(deptId, keyword){
    try{
        const artUrl = `${apiUrl}/search?departmentId=${deptId}&q=${keyword}&hasImages=True`;
        const artData = await superagent.get(artUrl);
        

        if(artData.body.total ===0){
            console.log('empty');
            return {}
        }

        let objectIds = artData.body.objectIDs;
        
        const randomId = objectIds[Math.floor(Math.random() * objectIds.length)];
        const artInfoUrl = `${apiUrl}/objects/${randomId}`;
        const artPieceData = await superagent.get(artInfoUrl);
        const artPiece = {
            'title': artPieceData.body.title,
            'artist': artPieceData.body.artistDisplayName,
            'department': artPieceData.body.department,
            'imageUrl': artPieceData.body.primaryImage
        };

        const collectionCheck = await ArtModel.findOne({title: artPiece.title})
        if (!collectionCheck){
            const newArt = new ArtModel({
                'title': artPieceData.body.title,
                'artist': artPieceData.body.artistDisplayName,
                'department': artPieceData.body.department,
                'imageUrl': artPieceData.body.primaryImage
            });
            await newArt.save();
        }

        return artPiece;



    }catch(error){
        console.log('not valid ' + error);
        return{};
    };
};