const serverConfig = require('../models/serverConfig');
const checkMod = require('../actions/checkMod');
const createGuildProfile = require('../actions/createGuildProfile');

module.exports = {
    name: 'config-level-message',
    description: "turn on/off level up messages!",
    async execute(message) {

        if (!await checkMod.checkMod(message.member, message.guild)) {
            return message.channel.send("you're not a mod");
        }
        guildData = await createGuildProfile.createGuildProfile(message.guild);

        if (guildData.levelUpMessages === true) {
            guildData.levelUpMessages = false;
        }else {
            guildData.levelUpMessages = true;
        }

        await serverConfig.findOneAndUpdate({ serverID: message.guild.id },
            {
                levelUpMessages: guildData.levelUpMessages
            })

        if (guildData.levelUpMessages === true) {
            message.channel.send(`Level up messages have been turned on`);
        }else {
            message.channel.send(`Level up messages have been turned off`);
        }

    }
}