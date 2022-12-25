const config = require('../config.json');
const locale = require('./locale');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages] });
const fs = require('fs');
const path = require('path');

/* Event handling */
const eventsPath = path.join(__dirname, 'events');
const events = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of events) {
    const eventPath = path.join(eventsPath, file);
    const event = require(eventPath);
    if (Events[event.name] && event.execute) {
        const eventName = Events[event.name]
        if (event.once) {
            client.once(eventName, (...args) => event.execute(client, ...args));
        } else {
            client.on(eventName, (...args) => event.execute(client, ...args));
        }
    } else  {
        console.log('\x1b[31m%s\x1b[0m', `event '${event.name}' doesn't exist`);
    }
}

/* Initialize client login */
client.login(config.token);