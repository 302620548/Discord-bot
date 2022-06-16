const serverConfig = require('../models/serverConfig');
const checkMod = require('../actions/checkMod');
const createGuildProfile = require('../actions/createGuildProfile');

module.exports = {
    name: 'removethread',
    description: "Make this channel no longer automatically create threads on every message!",
    async execute(message) {
        removethreads();
        async function removethreads() {
            if (!await checkMod.checkMod(message.member, message.guild)) {
                return message.channel.send("you're not a mod");
            }

            guildData = await createGuildProfile.createGuildProfile(message.guild);
            guildData.threadChannels.splice(guildData.threadChannels.indexOf(message.channelId),1);

            await serverConfig.findOneAndUpdate({ serverID: message.guild.id },
                {
                    threadChannels: guildData.threadChannels
                })
            message.channel.send(`Threads will no longer automatically be created in: <#${message.channel.id}>`);
        }
    }
}