const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	aliases: [],
	permissions: [],
	usage: 'help <command> ',
	enabled: true,
	async execute(message, args) {
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setTitle(`Help!`)
				.setDescription('use !help {command} to see additional command info!')
				.setTimestamp(new Date());
			const help = {};
			message.client.commands.map((command) => {
				const cat = command.module;
				if (!help.hasOwnProperty(cat)) help[cat] = [];
				help[cat].push('`' + command.name + '`');
			});
			for (let category in help) {
				embed.addField(
					`**${category.charAt(0).toUpperCase() + category.slice(1)}**`,
					help[category].join(' ')
				);
			}
			await message.channel.send(embed);
			console.log(help);
		} else {
			let command =
				message.client.commands.get(args[0]) ||
				message.client.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(args[0])
				);
			if (message.client.commands.has(args[0])) {
				const embed = new MessageEmbed()
					.setTitle(
						`${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`
					)
					.addField('Name', command.name)
					.addField(
						'Aliases',
						command.aliases
							? '`' + command.aliases.join(', ') + '`'
							: 'No Aliases'
					)
					.addField('Usage', command.usage ? command.usage : 'Not Usage set.')
					.setColor('GREEN')
					.setTimestamp(new Date());

				await message.channel.send(embed);
			} else {
				const embed = new MessageEmbed()
					.setTitle('ERROR!')
					.setColor('RED')
					.setDescription(
						'`' + args[0] + '`' + ` was not found. Maybe a spelling error?`
					)
					.setTimestamp(new Date());

				message.channel
					.send(embed)
					.then((msg) => msg.delete({ timeout: 5000 }));
			}
		}
	},
};
