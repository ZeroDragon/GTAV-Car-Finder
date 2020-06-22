require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const cars = require('./carritos.json')
const levels = require('./levels.json')
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true})

bot.onText(
  /^\/help$/i,
  async ({ chat: { id: chatId}}) => {
    await bot.sendMessage(
      chatId,
      'Use\n\`/car <car name>\`\nto get its hex address and extra info.\nName must be exact match (case insensitive)',
      { parse_mode: 'Markdown' }
    )
  }
)

bot.onText(
  /^\/car (.+)$|^\/car$/i,
  async ({ chat: { id: chatId}}, [, carName = 'elegy']) => {
    const name = carName.toUpperCase()
    const car = cars[name]
    let message = 'no car found with that name'
    if (car) message = `${ name } | ${ car.hex }\n\`\`\` ${ car.data } \`\`\` `,
    await bot.sendMessage(
      chatId,
      message,
      { parse_mode: 'Markdown' }
    )
  }
)

bot.onText(
  /^\/level (.+)$|^\/level$/i,
  async ({ chat: { id: chatId}}, [, levelFind = 1]) => {
    //console.log(levels)
    let message = 'no level found with that number'
    if ((~~levelFind === parseInt(levelFind, 10) && (levelFind > 0 && levelFind <= levels.length))) {
      const numberLevel = levelFind
      const level = levels[numberLevel - 1]
      message = `RANK XP ${ numberLevel } = \`\`\` ${ level } \`\`\` `
    }
    await bot.sendMessage(
      chatId,
      message,
      { parse_mode: 'Markdown' }
    )
  }
)

