"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
        if (command === 'cowsay') {
            try {
                (0, cowsay_1.default)(param);
            }
            catch (error) {
                console.log(error);
                return;
            }
            message.react('🐮').then().catch(console.error);
            const output = (0, cowsay_1.default)(param);
            if (command === 'cowsay' && output.length > 2000) {
                message.react('🙁').then().catch(console.error);
                message
                    .reply({
                    content: 'exceeding 2000 character limit',
                })
                    .catch(console.error);
            }
            message
                .reply(`
    \`\`\`
    ${output}
    \`\`\`
    `)
                .catch(console.error);
        }
    },
};
