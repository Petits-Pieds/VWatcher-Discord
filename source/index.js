const config = require("../config.json");
const locale = require("./locale");
const { Client, Events, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder, ChannelType } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.DirectMessages] });
const fs = require("fs");
const path = require("path");
const guildCommands = [];
const globalCommands = [];

/* Command handling */
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ("data" in command && "execute" in command) {
        if (command.global) {
            globalCommands.push(command.data.toJSON());
        } else {
            guildCommands.push(command.data.toJSON());
        }
        client.commands.set(command.data.name, command);
	} else {
		console.log(`The command at ${filePath} is missing a required 'data' or 'execute' property.`);
	}
}

/* Command handling */
client.modals = new Collection();

const modalsPath = path.join(__dirname, "modals");
const modalsFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith(".js"));

for (const file of modalsFiles) {
	const filePath = path.join(modalsPath, file);
	const modal = require(filePath);
	if ("execute" in modal) {
        client.modals.set(modal.name, modal);
	} else {
		console.log(`The command at ${filePath} is missing a required 'data' or 'execute' property.`);
	}
}

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing application (/) commands.`);

        await rest.put(
			Routes.applicationGuildCommands(config.clientId, config.guildId),
			{ body: guildCommands },
		).then(data => {
            console.log(`Successfully reloaded ${data.length} guild (/) commands.`);
        });

		await rest.put(
			Routes.applicationCommands(config.clientId),
			{ body: globalCommands },
		).then(data => {
            console.log(`Successfully reloaded ${data.length} global (/) commands.`);
        });
	} catch(error) {
		console.error(error);
	}
})();

/* Event handling */
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
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
        console.log("\x1b[31m%s\x1b[0m", `event "${event.name}" doesn"t exist`);
    }
}

/* Initialize client login */
client.login(config.token);