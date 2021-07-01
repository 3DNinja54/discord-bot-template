const fs = require('fs');
const models = fs.readdirSync('models').filter((file) => file.endsWith('.js'));

for (let model of models) {
	require(`../models/${model}`);
}
