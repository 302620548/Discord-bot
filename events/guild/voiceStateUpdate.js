//Runs when a message pops up
const giveXP = require("../../actions/giveXp");
const {clearInterval} = require("timers");

const intervals = new Object();

module.exports = async (Client, client, oldMember, newMember) =>{

    let newUserChannel = newMember.channelId;
    let oldUserChannel = oldMember.channelId;

    function startInterval () {
        intervals[`${newMember.member.user.id + newMember.guild.id}`] = setInterval((test) => {
            giveXP.giveXp(newMember.member, newMember.guild);
        }, 60000);
    }


    if (newUserChannel) {
        // Member is a bot:
        if (newMember.member.user.bot) {
            //console.log("bot");
            return;
        }

        // Member is muted:
        if (newMember.member.voice.selfMute) {
            //console.log("muted");
            if (intervals[`${newMember.member.user.id + newMember.guild.id}`]) {
                clearInterval(intervals[`${newMember.member.user.id + newMember.guild.id}`]);
            }

        } else { // Member is NOT muted
            //console.log("not muted");
            startInterval();
        }
    }
    else { // Member leaves a voice channel
        //console.log("left voice");
        if (intervals[`${newMember.member.user.id + newMember.guild.id}`]) {
            clearInterval(intervals[`${newMember.member.user.id + newMember.guild.id}`]);
        }
    }
}