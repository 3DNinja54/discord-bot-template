const Guild = require('../../models/guild');

module.exports = {
	name: 'prefix',
	aliases: [],
	permissions: ['BAN_MEMBERS'],
	enabled: true,
	usage: 'prefix (prefix)',
	async execute(message, args) {
		const guildData = await Guild.findOne({ guildID: message.guild.id });

		if (!args[0]) {
			return message.channel.send(`Please specify a prefix!`);
		}
		if (args[0] >= 5) {
			return message.channel.send('That prefix is too long!');
		}

		guildData.prefix = args[0];
		guildData.save();

		message.channel.send(`Prefix changed to \`\ ${args[0]} \`\. `);
	},
};
