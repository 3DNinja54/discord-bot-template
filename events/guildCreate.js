const { client } = require('../index.js');

const Guild = require('../models/guild.js');
client.on('guildCreate', async (guild) => {
	const guildData = await Guild.findOne({ guildID: guild.id });

	if (!guildData) {
		await Guild.create({ guildID: guild.id });
	}

	console.log(`I have joined ${guild.name} | [${guild.id}]`);
});
