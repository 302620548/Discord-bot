const { MessageEmbed } = require('discord.js');
const createMemberProfile = require('../actions/createMemberProfile');

module.exports = {
    name: 'rank',
    description: "Check your rank!",
    execute(message) {
        async function getProfileData(message) {
            let target = message.member;
            if (message.mentions.members.first()){
                target = message.mentions.members.first();
            }

            let memberData = await createMemberProfile.createMemberProfile(target, message.guild);

            let progress = `${100/ (5 * (memberData.level ** 2) + (50 * memberData.level) + 100) *memberData.xp}`
            let percent = Math.round(progress)
            //console.log(progress);
            progress = Math.floor(progress / 10);
            let fill = 10 - progress;

            const rankEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({ name: target.user.username })
                .setDescription(`Current level: ${memberData.level}\nCurrent xp: ${memberData.xp}/${5 * (memberData.level ** 2) + (50 * memberData.level) + 100}\n`
                + "▰".repeat(progress)+"▱".repeat(fill) + ` ${percent}%`)
                .setThumbnail(target.user.avatarURL())
                .setTimestamp()

            message.channel.send({ embeds: [rankEmbed] });

        }
        getProfileData(message);
    }
}