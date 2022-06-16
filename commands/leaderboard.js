const mongoose = require("mongoose");
const profileModel = require('../models/profileSchema');
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'leaderboard',
    description: "See the leaderboard of this server!",
    execute(message) {
        let leaderboard = "";
        async function getProfileData(message) {
            let profileData = await profileModel
                .find({serverID: message.guild.id })
                .sort({level: -1})
                .limit(10);
            for (i = 0; i < profileData.length; i++) {
                leaderboard = leaderboard + "[Level:  " + profileData[i].level + "]   " +  `<@${profileData[i].userID}>` + "\n";
            }

            const leaderBoard = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({ name: "Leaderboard:" })
                .setDescription(`${leaderboard}`)
                .setTimestamp()

            message.channel.send({ embeds: [leaderBoard] });

        }

        getProfileData(message);
    }
}