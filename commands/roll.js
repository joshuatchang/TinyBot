import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName('roll')
.setDescription('rolls a dice given by user input')
.addIntegerOption(option =>
    option
        .setName('die')
        .setDescription('the sides of the die to roll')
        .setMaxValue(1000)
        .setMinValue(1)
        .setRequired(true));
    

export async function execute(interaction){
    const die = interaction.options.getInteger('die');
    await interaction.reply(String(Math.floor(Math.random() * die) + 1));
}