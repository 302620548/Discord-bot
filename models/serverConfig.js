const mongoose = require('mongoose')

const serverConfig = new mongoose.Schema({
        serverID: { type: String, require: true },
        serverName: { type: String, require: true },
        prefix: { type: String, default: "-" },
        modRole: { type: String},
        bannedRole: { type: String },
        levelUpMessages: {type: Boolean},
        levelUpRoles: { type: Array },
        threadChannels: { type: Array },
        upvoteChannels: { type: Array },
    },
    {
        versionKey: false,
    });

const Servers = mongoose.model('serverModels', serverConfig);

module.exports = Servers;