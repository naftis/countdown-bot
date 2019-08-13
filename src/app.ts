process.env.NTBA_FIX_319 = '😋'; // Gets rid of node-telegram-bot-api warnings
process.env.NTBA_FIX_350 = '😋'; // -//-

import * as schedule from 'node-schedule';
import * as TelegramBot from 'node-telegram-bot-api';

const botToken = process.env.TOKEN || '';
const chatId = process.env.CHAT_ID;
const startDate = process.env.START_DATE || '2019-08-12'; // DDDD/MM/YY
const endDate = process.env.END_DATE || '2019-12-31';
const message = process.env.MESSAGE;

if (!botToken || !chatId || !startDate || !endDate || message) {
  throw new Error('Check process.env!');
}

const bot = new TelegramBot(botToken);

function getDifference(date: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  const secondDate = new Date(endDate);

  return Math.round(Math.abs((date.getTime() - secondDate.getTime()) / oneDay));
}

function getMessage() {
  const daysToEnd = getDifference(new Date());
  const daysFromStart = getDifference(new Date(startDate));
  const amountOfDays = daysFromStart - daysToEnd;

  return `**${message}:** Päivä #${amountOfDays} / ${daysFromStart}`;
}

schedule.scheduleJob('1 7 * * *', () => {
  if (new Date() < new Date(endDate)) {
    bot.sendMessage(chatId, getMessage());
  }
});
