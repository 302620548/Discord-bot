const serverConfig = require('../models/serverConfig');
const checkMod = require('../actions/checkMod');
const createGuildProfile = require('../actions/createGuildProfile');

module.exports = {
    name: 'addthread',
    description: "Make this channel automatically create threads on every message!",
    async execute(message) {
        addThreads()
        async function addThreads() {
            if (!await checkMod.checkMod(message.member, message.guild)) {
                return message.channel.send("you're not a mod");
            }

            guildData = await createGuildProfile.createGuildProfile(message.guild);
            guildData.threadChannels.push(message.channelId);
            //console.log(message.guild.id);
            await serverConfig.findOneAndUpdate({ serverID: message.guild.id },
                {
                    threadChannels: guildData.threadChannels
                })
            message.channel.send(`Threads will automatically be created in: <#${message.channel.id}>`);
        }
    }
}