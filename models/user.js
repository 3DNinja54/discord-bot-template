const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	userID: String,

	balance: {
		type: Number,
		default: 0,
	},
});

module.exports = model('User', userSchema);
