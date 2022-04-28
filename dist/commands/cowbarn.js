"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const cowsay_1 = tslib_1.__importDefault(require("../utils/cowsay"));
exports.default = {
    callback: (message, ...args) => {
        const PREFIX = process.env.PREFIX || 'tbr!';
        const cont = message.content
            .toLowerCase()
            .substring(PREFIX.length)
            .slice()
            .trim()
            .split(/ /);
        const command = cont.shift();
        const param = cont.pop();
        const output = (0, cowsay_1.default)(param);
        const exampleEmbed = new discord_js_1.MessageEmbed()
            .setColor('#FF00FF')
            .setTitle(`List of Cows`)
            .setDescription(`\`\`\`${output}\`\`\``)
            .setImage('https://i.imgur.com/NBLPjiP.jpeg')
            .setThumbnail('https://i.imgur.com/xsoHX4V.png')
            .setURL('https://github.com/piuccio/cowsay/tree/master/cows')
            .addField('Current Cow:', param, true);
        message.channel.send({ embeds: [exampleEmbed] });
    },
};
