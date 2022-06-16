const profileModel = require("../models/profileSchema");


async function createMemberProfile(member, guild) {
    try {
        let profileData = await profileModel.findOne({ userID: member.user.id, serverID: guild.id });
        if (!profileData) {
            const newUser = new profileModel({
                username: member.user.username,
                userID: member.user.id,
                serverID: guild.id,
                level: 1,
                xp: 0,
                upvotes: 0,
                downvotes: 0,
                bumps: 0
            });
            const savedProfile = await newUser.save();
        }
    } catch (err) {
        console.log(err);
    }
    changeUsername = await profileModel.findOne({ userID: member.user.id, serverID: guild.id });
    if (changeUsername.username !== member.user.username) {
        await profileModel.findOneAndUpdate({ userID: member.user.id, serverID: guild.id },
            {
                username: member.user.username,
            })
    }
    return await profileModel.findOne({ userID: member.id, serverID: guild.id });
}

module.exports = {createMemberProfile};