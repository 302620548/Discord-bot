//On startup when connecting to Discord
module.exports = (Client, client) =>{
    console.log('Yeah guys, look, LOOK! Re-connected!' + client.user.tag);
    client.user.setActivity("Hentai", { type: "WATCHING" });
}