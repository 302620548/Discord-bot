module.exports = {
    name: 'xyz',
    description: "This command is to xyz summon!",
    execute(message, args){
        message.reply(`XYZ SUMMON!`).catch(console.error);
    }
}