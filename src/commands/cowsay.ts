import { Message } from 'discord.js';
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

    if (command === 'cowsay') {
      // Check if user gave proper image name
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
  },
};
