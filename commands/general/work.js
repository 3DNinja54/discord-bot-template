// DB example.
module.exports = {
	name: 'work',
	async execute(message, args) {
		const User = require('../../models/user.js');
		const userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			await User.create({ userID: message.author.id });
			return message.channel.send('User added!');
		}

		userData.balance += 1;
		userData.save();
		message.channel.send(userData.balance);
	},
};
