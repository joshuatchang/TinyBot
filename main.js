

import {config} from 'dotenv';
import {Client, Events, GatewayIntentBits} from 'discord.js';
import {connect} from 'mongoose';

import * as eightball from './commands/eightball.js';
import * as roll from './commands/roll.js';
import * as calculator from './commands/calculator.js';
import * as getart from './commands/getart.js';
import * as pastresults from './commands/pastresults.js';
import departments from './data/departments.json' with { type: "json"};

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});


client.on('ready', () => {
    console.log('bot is ready');
})

client.on('interactionCreate', (interaction) =>{
    if(!interaction.isAutocomplete()) return;
    //if(!interaction.commandName=== 'getart') return;

    const focusedValue = interaction.options.getFocused();

    const filteredChoices = departments.filter((dept) => 
        dept.name.toLowerCase().startsWith(focusedValue.toLowerCase())
    );

    const results = filteredChoices.map((choice) => {
        return{
            name: `${choice.name}`, value: `${choice.id}`
        }
    })

    interaction.respond(results.slice(0,25))
})

async function handleInteraction(interaction, args){
    if (!interaction.isCommand()) return;
    switch(interaction.commandName){
        case '8Ball':
            await eightball.execute(interaction);
            break;
        case 'roll':
            await roll.execute(interaction);
            break;
        case 'calc':
            await calculator.execute(interaction);
            break;
        case 'getart':
            await getart.execute(interaction);
            break;
        case 'pastresults':
            await pastresults.execute(interaction);
            break;
    }
}

client.login(process.env.TOKEN);
client.on(Events.InteractionCreate, handleInteraction);
(async () => {
   await connect(process.env.DB_TOKEN).catch(console.error)
})();
