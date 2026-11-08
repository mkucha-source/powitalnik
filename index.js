const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot online');
}).listen(process.env.PORT || 3000);

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once('ready', () => {
    console.log(`✅ Bot: ${client.user.tag}`);
});

client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
    if (channel) channel.send(`👋 Witamy ${member.user}!`);
});

client.on('guildMemberRemove', (member) => {
    const channel = member.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
    if (channel) channel.send(`❌ **${member.user.tag}** opuścił serwer.`);
});

client.login(process.env.DISCORD_TOKEN);
