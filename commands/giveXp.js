const { MessageEmbed } = require('discord.js');
const profileModel = require("../models/profileSchema");
const createMemberProfile = require('../actions/createMemberProfile');
const createGuildProfile = require('../actions/createGuildProfile');
const checkMod = require('../actions/checkMod');

module.exports = {
    name: 'givexp',
    description: "Check your rank!",
    execute(message, args) {
        async function getProfileData(message, args) {

            //check if it's a mod
            if (!await checkMod.checkMod(message.member, message.guild)) {
                return message.channel.send("you're not a mod");
            }
            //if user got mentioned, give that person xp
            let target = message.member;
            let amountXp;
            if (!args[0]){
                return message.channel.send("How much xp would you like to give?");
            }else {amountXp = args[0]}
            if (message.mentions.members.first()){
                target = message.mentions.members.first();
                if (!args[1]){
                    return message.channel.send("How much xp would you like to give?");
                }else {amountXp = args[1]}
            }

            try{amountXp = parseInt(amountXp)}catch (e) {
                return message.channel.send("Fill in a number");
            }

            if (isNaN(amountXp)){
                return message.channel.send("Please fill in a valid number");
            }

            //create profile if it doesn't exist
            let memberData = await createMemberProfile.createMemberProfile(target, message.guild);
            memberData.xp = memberData.xp + amountXp;
            let requiredXP = 5 * (memberData.level ** 2) + (50 * memberData.level) + 100;
            if (memberData.xp > requiredXP) {
                while (memberData.xp > requiredXP) {
                    memberData.xp = memberData.xp - requiredXP;
                    memberData.level++;
                    requiredXP = 5 * (memberData.level ** 2) + (50 * memberData.level) + 100;
                }
            }
            const givenXpEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setDescription(`<@${target.id}> has been given ${amountXp}Xp and is Level ${memberData.level}!`)
                .setTimestamp()

            message.channel.send({ embeds: [givenXpEmbed] });

            await profileModel.findOneAndUpdate({ userID: memberData.userID, serverID: memberData.serverID },
                {
                    level: memberData.level,
                    xp: memberData.xp,
                })

        }
        getProfileData(message, args);
    }
}