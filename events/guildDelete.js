const { wipeOnLeave } = require('../config.json');
const { client } = require('../index.js');
const Guild = require('../models/guild.js');

client.on('guildDelete', async (guild) => {
	const guildData = await Guild.findOne({ guildID: guild.id });

	if (guildData && wipeOnLeave) {
		await Guild.deleteOne({ guildID: guild.id });
	}

	console.log(`I have left ${guild.name} | [${guild.id}]`);
});
