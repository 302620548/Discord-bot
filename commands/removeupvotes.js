const serverConfig = require('../models/serverConfig');
const checkMod = require('../actions/checkMod');
const createGuildProfile = require('../actions/createGuildProfile');

module.exports = {
    name: 'removeupvotes',
    description: "Make this channel no longer automatically add upvote emoji's on every message!",
    async execute(message) {
        removeUpvotes()
        async function removeUpvotes() {
            if (!await checkMod.checkMod(message.member, message.guild)) {
                return message.channel.send("you're not a mod");
            }

            guildData = await createGuildProfile.createGuildProfile(message.guild);
            guildData.upvoteChannels.splice(guildData.upvoteChannels.indexOf(message.channelId),1);
            //console.log(message.guild.id);
            await serverConfig.findOneAndUpdate({ serverID: message.guild.id },
                {
                    upvoteChannels: guildData.upvoteChannels
                })
            message.channel.send(`Upvotes will no longer be automatically added in: <#${message.channel.id}>`);
        }
    }
}