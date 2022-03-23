import * as cowsay from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

/*
Get random number from getRandomInt
Use that number to get a specific object in the quotes array
Use that object to access the properties quote and author
Format the value of the quote and author key to a string
Pass the string into default function
*/

const rand = getRandomInt(0, 25);
const val = quotes[rand];
const quoteMessage = val.quote;
const author = val.author;

export default function () {
  let output: string = cowsay.say({
    text: `${quoteMessage} - ${author}`,
    e: '^^',
    T: 'U ',
    r: true,
  });
  return output;
}
