const serverConfig = require('../models/serverConfig');
module.exports = {
    name: 'commands',
    description: "With this command, you can see all commands on this server",
    execute(message) {

        checkPrefix();
        async function checkPrefix() {
            let serverPrefix = await serverConfig.findOne({ serverID: message.guild.id });
            if (!serverPrefix) {
                prefix = "-";
            } else {
                prefix = serverPrefix.prefix;
            }

            message.channel.send(
                `${prefix}ban\n` +
                `${prefix}unban\n` +
                `${prefix}profile\n` +
                `${prefix}rank\n` +
                `${prefix}leaderboards\n` +
                `${prefix}xyz\n` +
                //`${prefix}boost\n` +
                `${prefix}commands\n`
            );
        }

    }
}