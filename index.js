// AUTO-GENERATED MASTER INDEX.JS
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel]
});
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'src', 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = [];
  (function walk(dir){
    const items = fs.readdirSync(dir);
    for (const it of items) {
      const fp = path.join(dir, it);
      const stat = fs.statSync(fp);
      if (stat.isDirectory()) walk(fp);
      else if (it.endsWith('.js')) commandFiles.push(fp);
    }
  })(commandsPath);
  for (const file of commandFiles){
    try {
      const cmd = require(file);
      const name = (cmd && (cmd.name || (cmd.data && cmd.data.name))) || path.basename(file, '.js');
      client.commands.set(name, cmd);
    } catch (e) {
      console.error('Failed to load command', file, e.message);
    }
  }
}
const eventsPath = path.join(__dirname, 'src', 'events');
if (fs.existsSync(eventsPath)) {
  const eventFiles = [];
  (function walk(dir){
    const items = fs.readdirSync(dir);
    for (const it of items) {
      const fp = path.join(dir, it);
      const stat = fs.statSync(fp);
      if (stat.isDirectory()) walk(fp);
      else if (it.endsWith('.js')) eventFiles.push(fp);
    }
  })(eventsPath);
  for (const file of eventFiles){
    try {
      const event = require(file);
      const name = event.name || event.event || path.basename(file, '.js');
      if (event.once) client.once(name, (...args)=> event.execute ? event.execute(client, ...args) : event(...args));
      else client.on(name, (...args)=> event.execute ? event.execute(client, ...args) : event(...args));
    } catch (e) {
      console.error('Failed to load event', file, e.message);
    }
  }
}
global.sharedClient = client;
const token = process.env.BOT_TOKEN || process.env.TOKEN || 'BOT_TOKEN_HERE';
if (!token || token === 'BOT_TOKEN_HERE') {
  console.warn('No bot token found. Please set BOT_TOKEN in .env (see .env.example)');
} else {
  client.login(token).then(()=>console.log('Logged in as', client.user && client.user.tag)).catch(err=>console.error('Login failed', err.message));
}
client.on('ready', ()=>{
  console.log('Client ready:', client.user && client.user.tag);
});