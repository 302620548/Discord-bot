
//Connect to Discord api and the database
require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["CHANNEL", 'REACTION', 'MESSAGE']});
const mongoose = require("mongoose");

//Let's us write the commands in a folder
client.commands = new Collection();
client.events = new Collection();
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Client);
})

/*async function exitHandler(exit) {
    console.log(exit)
    if (exit === "exit") {require(`./handlers/'event_handler'`)(client, Client);}
    process.exit()
}
//catches ctrl+c event
process.on('SIGINT', () => {exitHandler("SIGINT")});
process.on('exit', () => {exitHandler("exit")});

catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', () => {exitHandler("SIGUSR1")});
process.on('SIGUSR2', () => {exitHandler("SIGUSR2")});

//catches uncaught exceptions
process.on('uncaughtException', () => {exitHandler("uncaughtException")});*/

//Connect with the database and login into the Discord bot
mongoose.connect(process.env.MONGODB_SRV)
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log(err);
    });

client.login(process.env.token);