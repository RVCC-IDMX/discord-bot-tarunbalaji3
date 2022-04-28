import { Message, MessageEmbed } from 'discord.js';
import cowsay from '../utils/cowsay';

export default {
  callback: (message: Message, ...args: string[]) => {
    const PREFIX = process.env.PREFIX || 'tbr!';
    const cont = message.content
      .toLowerCase()
      .substring(PREFIX.length)
      .slice()
      .trim()
      .split(/ /);
    const command = cont.shift()!;
    const param = cont.pop();

    const output = cowsay(param);

    const exampleEmbed = new MessageEmbed()
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
