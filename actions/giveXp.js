const profileModel = require('../models/profileSchema')
const { MessageEmbed } = require('discord.js');
const createMemberProfile = require('./createMemberProfile');
const createGuildProfile = require('./createGuildProfile');

async function giveXp(member, guild, message) {

    let memberData = await createMemberProfile.createMemberProfile(member, guild);

    let gainedXP = Math.random() * (25 - 15) + 15;
    if (message) {
        const boostedRoles = ["🌸Server Booster", "✨Twitch Subscriber", "🍄VIP"];
        const filteredRoles = message.member.roles.cache.find(role => boostedRoles.includes(role.name));
        if (filteredRoles){
            gainedXP = gainedXP*1.2
        }
    }

    if (!message){
        gainedXP = gainedXP/2;
    }
    //console.log(gainedXP)

    gainedXP = Math.round(gainedXP);
    memberData.xp = memberData.xp + gainedXP;
    // Logs when someone gains xp
    //console.log(`${memberData.username} has ${memberData.xp}`);

    let requiredXP = 5 * (memberData.level ** 2) + (50 * memberData.level) + 100;

    if (memberData.xp > requiredXP) {
        while (memberData.xp > requiredXP) {
            memberData.xp = memberData.xp - requiredXP;
            memberData.level++;
            requiredXP = 5 * (memberData.level ** 2) + (50 * memberData.level) + 100;
        }
        // Level up message
        if (message){
            guildData = await createGuildProfile.createGuildProfile(message.guild);
            if (guildData.levelUpMessages == true){
                const levelUp = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(`<@${message.author.id}> just reached Level ${memberData.level}!`)

                message.channel.send({ embeds: [levelUp] });
            }
        }
    }
    //console.log(memberData.xp)
    await profileModel.findOneAndUpdate({ userID: memberData.userID, serverID: memberData.serverID },
        {
            level: memberData.level,
            xp: memberData.xp,
        })
}

module.exports = {giveXp};