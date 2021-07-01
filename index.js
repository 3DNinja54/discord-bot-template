const { Client } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const { TOKEN, mongoDbUrl } = require('./config.json');
const client = new Client();

exports.client = client;

mongoose.connect(mongoDbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const handlers = fs
	.readdirSync('handlers')
	.filter((file) => file.endsWith('.js'));

for (let handler of handlers) {
	require(`./handlers/${handler}`);
}

client.login(TOKEN); // NEVER EVER SHARE THIS TOKEN!
