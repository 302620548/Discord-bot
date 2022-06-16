
const serverConfig = require('../models/serverConfig');

async function createGuildProfile(guild) {
    let serverData
    try {
        serverData = await serverConfig.findOne({serverID: guild.id});
        if (!serverData) {
            const newServer = new serverConfig({
                serverID: guild.id,
                serverName: guild.name,
                bannedRole: null,
                modRole: null,
                threadChannel: null
            });
            const savedServer = await newServer.save();
        }
    } catch (err) {
        console.log(err);
    }
    return await serverConfig.findOne({ serverID: guild.id });
}

module.exports = {createGuildProfile};