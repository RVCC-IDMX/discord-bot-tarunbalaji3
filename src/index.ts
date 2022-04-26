import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();

const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
console.table(channels);

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (!channels.includes(message.channel.id)) return;

  const PREFIX = process.env.PREFIX || 'tbr!';
  const check = message.content;
  const bool = check.startsWith(PREFIX);

  //Check if message starts with PREFIX, if not, exit
  if (bool != true) {
    return;
  }

  //Parse Messages
  const args = message.content
    .toLowerCase()
    .substring(PREFIX.length)
    .slice()
    .trim()
    .split(/ /);
  const command = args.shift()!;
  const param = args.pop();

  if (command === 'ping') {
    message
      .react('🤩')
      .then(() => {
        console.log('react to ping');
      })
      .catch(console.error);
    message
      .reply({
        content: 'pong',
      })
      .catch(console.error);
  }
  if (command === 'cowsay') {
    //Check if user gave proper image name
    try {
      cowsay(param);
    } catch (error) {
      console.log(error);
      return;
    }
    message.react('🐮').then().catch(console.error);
    const output = cowsay(param);
    if (command === 'cowsay' && output.length > 2000) {
      message.react('🙁').then().catch(console.error);
      message
        .reply({
          content: 'exceeding 2000 character limit',
        })
        .catch(console.error);
    }
    message
      .reply(
        `
    \`\`\`
    ${output}
    \`\`\`
    `
      )
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
