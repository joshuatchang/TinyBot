import { SlashCommandBuilder } from "discord.js";


export const data = new SlashCommandBuilder()
.setName('calc')
.setDescription('calculates between two numbers, needs two numbers seperated by an operator')
.addIntegerOption(option =>
    option
        .setName('a')
        .setDescription('first variable')
        .setMinValue(0)
        .setMaxValue(1000000)
        .setRequired(true))
.addStringOption(option =>
    option
        .setName('operand')
        .setDescription('The operand')
        .addChoices(
            { name: 'Add',value: '+' },
            { name: 'Subtract',value: '-' },
            { name: 'Multiply',value: '*' },
            { name: 'Divide',value: '/' },
            { name: 'Power',value: '^' },
        )
        .setRequired(true))
.addIntegerOption(option =>
    option
        .setName('b')
        .setDescription('second variable')
        .setMinValue(0)
        .setMaxValue(1000000)
        .setRequired(true));

export async function execute(interaction){
    const a = interaction.options.getInteger('a');
    const b = interaction.options.getInteger('b');
    const operand = interaction.options.getString('operand');

    let result = 0;
    switch(operand){
        case '+':
            result = (a + b);
            break;
        case '-':
            result = (a - b);
            break;
        case '*':
            result = (a*b);
            break;
        case '/':
            if(b==0){
                result = 0
                break;
            }
            result = (a/b)
            break;
        case '^':
            result = Math.pow(a,b);
    }
    await interaction.reply(String(result));

}