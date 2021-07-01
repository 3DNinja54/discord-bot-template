module.exports = {
	name: 'foo', // name of command,
	aliases: [], // other names of the command,
	enabled: true, // if command is enabled
	permissions: [], // permissions to run the command
	cooldown: 0, // Cooldown (in seconds) of command
	ownerOnly: false, // Only Owners (user IDs supplied in config.json) can use this command
	usage: '', // How to use command (for help command)
	execute(message, args) {
		// CODE GOES HERE
		message.channel.send(`bar`);
	},
};
