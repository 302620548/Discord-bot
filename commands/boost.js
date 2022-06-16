const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'boost',
    description: "With this command, you can see if you are getting boosted",
    async execute(message) {
        let profileData = await profileModel.findOne({ userID: message.author.id, serverID: 367012065598111744 });
            if (!profileData) {
                message.channel.send(
                    `To get a 1.2x boost you need to subscribe to Gleyveon on Twitch, be part of the https://discord.gg/s4VmftX Discord server and have your Twitch account linked to discord.`
                );
                return;
            }
        if (profileData.roles.includes("Twitch Subscriber")) {
            message.channel.send(
                `${profileData.username}, you're currently being boosted and gain XP at a x1.2 rate.\n\n`
            );
        }else {
            message.channel.send(
                `To get a 1.2x boost you need to subscribe to Gleyveon on Twitch and have your Twitch account linked to discord.`
            );
        }

    }
}