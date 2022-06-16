const { MessageEmbed } = require('discord.js');
const createMemberProfile = require('../actions/createMemberProfile');

module.exports = {
    name: 'profile',
    description: "With this command, you can check out your profile!",
    execute(message) {
        async function getProfileData(message) {
            let target = message.member;
            if (message.mentions.members.first()){
                target = message.mentions.members.first();
            }
            let memberData = await createMemberProfile.createMemberProfile(target, message.guild);

            const profileEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({ name: target.user.username })
                .setDescription(`<:level:973993591988961351> level: ${memberData.level}\n`
                    + `<:upvote:972890097664020583> upvotes: ${memberData.upvotes} <:downvote:972890097718538291> downvotes: ${memberData.downvotes}\n<:boost:974002194040909904> bumps: ${memberData.bumps}\nㅤ`)
                .setThumbnail(target.user.avatarURL())
                .setTimestamp()

            message.channel.send({ embeds: [profileEmbed] });

        }
        getProfileData(message);
    }
}