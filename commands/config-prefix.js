const mongoose = require('mongoose');
const serverConfig = require('../models/serverConfig');

module.exports = {
    name: 'config-prefix',
    description: "With this command, you can see all configure commands",
    execute(message, args) {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            createProfile();
        } else {
            message.channel.send("You do not have the right permissions!")
        }

        async function createProfile() {
            let serverData
            try {
                serverData = await serverConfig.findOne({ serverID: message.guild.id });
                if (!serverData) {
                    const newServer = new serverConfig({
                        serverID: message.guild.id,
                        serverName: message.guild.name,
                        prefix: "-"
                    });
                    const savedServer = await newServer.save();
                }
            } catch (err) {
                console.log(err);
            }
            serverData = await serverConfig.findOne({ serverID: message.guild.id });

            await serverConfig.findOneAndUpdate({ serverID: message.guild.id },
                {
                    prefix: args[0]
                })
                message.channel.send(`The prefix has been changed to: "${args[0]}"`);

        }
    }
}