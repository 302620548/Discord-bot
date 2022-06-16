const profileModel = require('../../models/profileSchema');
const serverConfig = require('../../models/serverConfig');
const createGuildProfile = require('../../actions/createGuildProfile');
module.exports = async (Client, client, guild) =>{
    //upon joining a guild, it will check if you already have a profile. If not it will create one.
    await createGuildProfile.createGuildProfile(guild);
}