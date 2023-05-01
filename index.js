const {Client, Events, GatewayIntentBits} = require('discord.js');
const {config} = require('dotenv')
config();


const client = new Client({
    intents: [GatewayIntentBits.Guilds]});

client.on(Events.ClientReady, c  => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.login(process.env.DiscordAPI);
