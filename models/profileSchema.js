const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
        username: { type: String, require: true },
        userID: { type: String, require: true },
        serverID: { type: String, require: true },
        level: { type: Number },
        xp: { type: Number },
        coins: { type: Number },
        upvotes: { type: Number },
        downvotes: { type: Number },
        bumps: { type: Number },

    },
    {
        versionKey: false,
    });

const Users = mongoose.model('profileModels', profileSchema);

module.exports = Users;