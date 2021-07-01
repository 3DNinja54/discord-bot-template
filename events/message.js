const { client } = require('../index.js');
const { Collection } = require('discord.js');
const config = require('../config.json');
const Guild = require('../models/guild');
const User = require('../models/user');
client.cooldowns = new Collection();

client.on('message', async (message) => {
	const userData = await Guild.findOne({ userID: message.author.id });
	const guildData = await Guild.findOne({ guildID: message.guild.id });

	if (!userData) {
		await User.create({ userID: message.author.id });
	}
	if (!guildData) {
		await Guild.create({ guildID: message.guild.id });
	}
	const PREFIX = guildData.prefix;
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const cmdName = args.shift().toLowerCase();

	const command =
		client.commands.get(cmdName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdName));
	if (!command) return;

	if (!command.enabled) {
		return message.reply('This command is disabled.');
	}
	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}
	if (command.ownerOnly) {
		if (!config.OWNERS.includes(message.author.id)) {
			return message.channel.send('This is an owner only command!');
		}
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || config.defaultCooldown) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(
				`Please wait ${timeLeft.toFixed(
					0
				)} more second(s) before reusing the \`${command.name}\` command.`
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
		command.execute(message, args);
	} catch (err) {
		console.log(err);
	}
});
