const { client } = require('../index.js');
const fs = require('fs');
const { Collection } = require('discord.js');
client.commands = new Collection();
const modules = fs.readdirSync('commands');

for (let module of modules) {
	const files = fs.readdirSync(`commands/${module}`);

	for (let file of files) {
		const command = require(`../commands/${module}/${file}`);
		command.module = module;
		client.commands.set(command.name, command);
	}
}
