const serverConfig = require('../models/serverConfig');
const checkMod = require('../actions/checkMod');
const createGuildProfile = require('../actions/createGuildProfile');

module.exports = {
    name: 'addupvotes',
    description: "Make this channel automatically add upvote emoji's on every message!",
    async execute(message) {
        addUpvotes()
        async function addUpvotes() {
            if (!await checkMod.checkMod(message.member, message.guild)) {
                return message.channel.send("you're not a mod");
            }

            guildData = await createGuildProfile.createGuildProfile(message.guild);
            guildData.upvoteChannels.push(message.channelId);
            //console.log(message.guild.id);
            await serverConfig.findOneAndUpdate({ serverID: message.guild.id },
                {
                    upvoteChannels: guildData.upvoteChannels
                })
            message.channel.send(`Upvotes will automatically be added in: <#${message.channel.id}>`);
        }
    }
}