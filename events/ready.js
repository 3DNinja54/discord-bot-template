const { client } = require('../index.js');

client.once('ready', () => {
	client.user.setPresence({
		activity: { name: "I'm a new Discord bot!", type: 'PLAYING' },
		status: 'online',
	});
	console.log(`${client.user.tag} is ready!`);
});
