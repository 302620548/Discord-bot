const ms = require('ms');
const serverConfig = require('../models/serverConfig');
module.exports = {
    name: 'ban',
    description: "This is the ban command!",
    async execute(message, args) {

        serverData = await serverConfig.findOne({serverID: message.guild.id});

        if(message.mentions.members.first().roles.highest.position > message.guild.me.roles.highest.position) {
            return message.channel.send("My highest role is lower than the mentioned user's role. Move my role higher!");
        }
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) {
            return message.channel.send("I don't have enough permissions to do this!");
        }
        if (message.member.roles.cache.has(serverData.modRole) || message.member.permissions.has('ADMINISTRATOR')) {

            const target = message.mentions.users.first();
            if (target) {
                let bannedRole = serverData.bannedRole;

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!message.guild.roles.cache.has(bannedRole)){
                    return message.channel.send("The role doesn't exists (anymore)");
                }

                if (!args[1]) {

                    memberTarget.roles.add(bannedRole);
                    message.channel.send(`<@${memberTarget.user.id}> has been banned!`);
                    return;
                }



                memberTarget.roles.add(bannedRole);
                message.channel.send(`<@${memberTarget.user.id}> has been banned for ${ms(ms(args[1]))}`);

                setTimeout(function () {
                    memberTarget.roles.remove(bannedRole);
                }, ms(args[1]));

            } else {
                message.channel.send("That user doesn't exist");
            }
        } else {
            message.channel.send("You don't have the mod role")
        }
    }
}