const api = require('./api');
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_BIT010);

setInterval( async () => {

    const result = await api.depth();

    const buy = parseInt(result.bids[0][0]);
    const sell = parseInt(result.asks[0][0]);

    var date = new Date();
    var formatedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    report(result.bids[0][0], result.asks[0][0])
   
    
    console.log(`Time : ${formatedTime}`);
    console.log(`Buy : R$ ${result.bids[0][0]}`);
    console.log(`Sell : R$ ${result.asks[0][0]}`);
    console.log();

    if (sell < 184000) {
        bot.telegram.sendMessage(process.env.CHAT_ID, `Aqui é a Amy, Raphael, bom para comprar Bitcoin R$ ${result.asks[0][0]}`);
    } else if ( buy > 195000) {
        bot.telegram.sendMessage(process.env.CHAT_ID, `Aqui é a Amy, Raphael, bom para vender Bitcoin R$ ${result.bids[0][0]}`);
    } 
    
}, process.env.CRAWLER_INTERVAL)


function report(buy, sell) {

    var date = new Date();
    var hours = [9,12,3,6];

    if ((hours.indexOf(date.getHours()) !== -1 && ( date.getMinutes() == 1 || date.getMinutes() == 30) && date.getSeconds() > 48)) {
        bot.telegram.sendMessage(process.env.CHAT_ID, ` Aqui é a Amy, Raphael. Tudo bem ? \n\n Bitcoin Buy : R$ ${buy} \n Bitcoin Sell : R$ ${sell}`);
    }
}