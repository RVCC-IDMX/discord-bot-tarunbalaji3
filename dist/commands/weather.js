"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const axios_1 = tslib_1.__importDefault(require("axios"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    callback: (message, ...args) => {
        let param;
        if (args.length > 1) {
            param = `${args[0]} ${args[1]}`;
        }
        else {
            param = args;
        }
        axios_1.default
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${process.env.OPENWEATHER_ACCESS_KEY}`)
            .then((data) => {
            const kelvin = data.data.main.temp;
            const kev_low = data.data.main.temp_min;
            const kev_high = data.data.main.temp_max;
            const kev_feel = data.data.main.feels_like;
            const temp = Math.round(1.8 * (kelvin - 273.15) + 32);
            const temp_low = Math.round(1.8 * (kev_low - 273.15) + 32);
            const temp_high = Math.round(1.8 * (kev_high - 273.15) + 32);
            const temp_feel = Math.round(1.8 * (kev_feel - 273.15) + 32);
            const dateObj = new Date((data.data.sys.sunrise + data.data.timezone) * 1000);
            const utcString = dateObj.toUTCString();
            const rise_time = utcString.slice(-11, -4);
            const dateObjTwo = new Date((data.data.sys.sunset + data.data.timezone) * 1000);
            const utcStringTwo = dateObjTwo.toUTCString();
            const set_time = utcStringTwo.slice(-11, -4);
            const exampleEmbed = new discord_js_1.MessageEmbed()
                .setColor('#00FFFF')
                .setTitle(`Current Weather in ${param} - ${data.data.sys.country}`)
                .setDescription(`${temp}\u00B0F and ${data.data.weather[0].description}`)
                .addField('Low', `${temp_low}\u00B0F`, true)
                .addField('High', `${temp_high}\u00B0F`, true)
                .addField('Feels Like', `${temp_feel}\u00B0F`, true)
                .addField('Sunrise', `${rise_time} AM`, true)
                .addField('Sunset', `${set_time} PM`, true)
                .addField('Humidity', `${data.data.main.humidity}%`, true)
                .setImage(`https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`);
            message.channel.send({ embeds: [exampleEmbed] });
        })
            .catch((err) => {
            message.reply('Please enter a city name');
        });
    },
};
