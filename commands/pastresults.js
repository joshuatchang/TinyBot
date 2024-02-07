import { SlashCommandBuilder } from "discord.js";
import {ArtModel} from '../schemas/art.js';
import departments from "../data/departments.json" with { type: "json"};

export const data = new SlashCommandBuilder()
.setName('pastresults')
.setDescription('searches past results by department')
.addStringOption(option => option
    .setName('department')
    .setDescription('which department to search the database from')
    .setAutocomplete(true)
    .setRequired(true)
    )
    

export async function execute(interaction){
    const department = interaction.options.getString('department');
    const dept = departments.find((d) => d.id === parseInt(department))
    let artResults = await ArtModel.find({department: dept.name});

    if(!artResults){
        await interaction.reply('No Results Found')
    }
    else{
        let message = "Results :  \n";
        for(let i = 0; i < artResults.length; i++){
            message += `Title: ${artResults[i].title},\nArtist: ${artResults[i].artist},\nDepartment: ${artResults[i].department}\n\n`
        };

        await interaction.reply(message);
    }

    }
    