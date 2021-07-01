const { Schema, model } = require('mongoose');

const guildSchema = Schema({
	guildID: String,
	prefix: {
		type: String,
		default: ['!'],
	},
});

module.exports = model('Guild', guildSchema);
