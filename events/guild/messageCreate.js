//Runs when a message pops up
const profileModel = require('../../models/profileSchema');
const serverConfig = require('../../models/serverConfig');
const createMemberProfile = require('../../actions/createMemberProfile');
const createGuildProfile = require('../../actions/createGuildProfile');


const giveXP = require('../../actions/giveXp');
const coolDown = new Set();

module.exports = async (Client, client, message) =>{





    if (message.channel.id == "971729505708290099") {
        if (message.type !== "APPLICATION_COMMAND") {return message.delete().catch(console.error)} else {
            if (message.interaction.commandName == "bump"){
                let member = await message.guild.members.fetch(message.interaction.user.id).catch(console.error);
                memberData = await createMemberProfile.createMemberProfile(member, message.guild);
                if (!memberData.bumps){
                    memberData.bumps = 0;
                }
                memberData.bumps++;

                message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                })

                await profileModel.findOneAndUpdate({ userID: memberData.userID, serverID: memberData.serverID },
                    {
                        bumps: memberData.bumps
                    })

                setTimeout(function () {
                    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                        VIEW_CHANNEL: true
                    })
                }, 7200000);
            }else {return message.delete().catch(console.error)}

        }
    }



    //If it's a bot, stop the code
    if (message.author.bot) return;
    //If the message starts with "null" the bot no longer crashes
    if (message.content.startsWith(null)){message.content = ` ${message.content}`;}
    //if it's in DM's stop the code to prevent crashes
    if (message.channel.type == 'DM') {
        message.channel.send("Who are you? 👀 Get out of my DM's!");
        message.channel.send("<:Madge:926464075372847104>");
        return;
    }


    //give xp if user doesn't have a cooldown
    if (!coolDown.has(message.author.id + message.guild.id)){
        giveXP.giveXp(message.member, message.guild, message);
    }

    //Give a cooldown when user types a message and doesn't have a cooldown yet
    if (!coolDown.has(message.author.id + message.guild.id)) {
        coolDown.add(message.author.id + message.guild.id);
        setTimeout(() => {
            coolDown.delete(message.author.id + message.guild.id);
        }, 60000)
    }

    //make the prefix "-" so if someone changes to prefix to "undefined", they can still change it
    prefix = "-"
    //Here you can configure the bot with config commands
    if(message.content.startsWith(prefix)){
        args = message.content.slice(prefix.length).split(/ +/);
        command = client.commands.get(args.shift().toLowerCase());
        try{
            if (command.name == 'config-info') {
                command.execute(message, args);
            } else if (command.name == 'config-prefix') {
                command.execute(message, args);
            } else if (command.name == 'config-mod-role') {
                command.execute(message, args);
            } else if (command.name == 'config-banned-role') {
                command.execute(message, args);
            } else if (command.name == 'config-level-roles') {
                command.execute(message, args);
            }
        }catch (e) {
            
        }

    }
    //if the server has it's own prefix set, it will use that instead
    let serverPrefix = await serverConfig.findOne({ serverID: message.guild.id });
    if (serverPrefix) {
        prefix = serverPrefix.prefix;
    }
    //if the command exists, it will run it using the custom prefix
    if(message.content.startsWith(prefix)){
        args = message.content.slice(prefix.length).split(/ +/);
        command = client.commands.get(args.shift().toLowerCase());
        if (command) {
            command.execute(message, args);
        }
    }
    //Automatically create threads if the channel has been set up to do so
    if(!message.content.startsWith(prefix)){
        let guildData = await createGuildProfile.createGuildProfile(message.guild);
        if (guildData.threadChannels.includes(message.channel.id)) {

            $smallMessage = `${message.author.username}-${message.cleanContent.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}`.substring(0,100);

            message.startThread ({
                name: $smallMessage,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD'
            }).catch(console.error)


        }
    }
    //Automatically adds upvote/downvote if the channel has been set up to do so
    if(!message.content.startsWith(prefix)){
        let guildData = await createGuildProfile.createGuildProfile(message.guild);
        if (guildData.upvoteChannels.includes(message.channel.id)) {

            message.react("<:upvote:972890097664020583>").catch(console.error);
            message.react("<:downvote:972890097718538291>").catch(console.error);
        }
    }
}