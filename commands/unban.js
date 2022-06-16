const serverConfig = require('../models/serverConfig');

module.exports = {
    name: 'unban',
    description: "This is the unban command!",
    async execute(message, args) {

        guildData = await serverConfig.findOne({ serverID: message.guild.id });

        if(message.mentions.members.first().roles.highest.position > message.guild.me.roles.highest.position) {
            return message.channel.send("My highest role is lower than the mentioned user's role. Move my role higher!");
        }
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) {
            return message.channel.send("I don't have enough permissions to do this!");
        }

        if (message.member.roles.cache.has(guildData.modRole) || message.member.permissions.has('ADMINISTRATOR')) {

            const target = message.mentions.users.first();
            if (target) {
                let bannedRole = guildData.bannedRole;

                let memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.roles.remove(bannedRole);
                message.channel.send(`<@${memberTarget.user.id}> has been Unbanned!`)
            } else {
                message.channel.send("That user doesn't exist");
            }
        } else {
            message.channel.send("You don't have the mod role")
        }

    }
}