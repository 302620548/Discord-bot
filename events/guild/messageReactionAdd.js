const profileSchema = require("../../models/profileSchema");
const createMemberProfile = require('../../actions/createMemberProfile');

module.exports = async (Client, client, reaction, user) =>{
    if (!reaction.message.inGuild()) {return;}


    const message = await reaction.message.fetch(reaction.message.id).catch(console.error);
    //console.log(message);
    const member = await reaction.message.guild.members.fetch(message.author.id).catch(console.error);
    //console.log(member);

    if (member.user.bot || user.bot) {return;}
    if (member.user.id === user.id) {return;}

    let memberData = await createMemberProfile.createMemberProfile(member, reaction.message.guild);

    if (memberData.upvotes === undefined || memberData.downvotes === undefined){
        memberData.upvotes = 0;
        memberData.downvotes = 0;
    }

    if (reaction.emoji.id === "972890097664020583") {
        memberData.upvotes = memberData.upvotes + 1;
    }
    if (reaction.emoji.id === "972890097718538291") {
        memberData.downvotes = memberData.downvotes + 1;
    }
    await profileSchema.findOneAndUpdate({ userID: memberData.userID, serverID: message.guild.id},
        {
            upvotes: memberData.upvotes,
            downvotes: memberData.downvotes
        });

}