import { SlashCommandBuilder } from "discord.js";

const answers = new Array("It is certain", "Without a doubt","Yes definitely","Most likely",
                            "Outlook good", "Yes","Reply hazy, try again", "Ask again later", 
                                "Better not to tell you now", "Cannot Predict Now", "Concentrate and ask again",
                                    "No", "Don't Count on it", "My reply is no", "Outlook not so good", "Very Doubtful");

export const data = new SlashCommandBuilder()
.setName('8ball')
.setDescription('Interacts like an 8ball');

export async function execute(interaction){

    await interaction.reply(answers[Math.floor(Math.random()*answers.length)]);
}