const createGuildProfile = require('../actions/createGuildProfile');

async function checkMod(member, guild) {
    GuildData = await createGuildProfile.createGuildProfile(guild);

    if (member.roles.cache.has(GuildData.modRole) || member.permissions.has('ADMINISTRATOR') || guild.ownerID == member.id){
        return true;
    }else {
        return false;
    }
}

module.exports = {checkMod};