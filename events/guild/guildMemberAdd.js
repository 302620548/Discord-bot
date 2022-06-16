const profileModel = require('../../models/profileSchema');
const serverConfig = require('../../models/serverConfig');

const createMemberProfile = require('../../actions/createMemberProfile');
module.exports = async (Client, client, member) =>{
    //upon a member joining, it will check if you already have a profile. If not it will create one.
    await createMemberProfile.createMemberProfile(member, member.guild);
}