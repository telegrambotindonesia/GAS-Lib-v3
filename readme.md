## GAS Lib v3

Google Apps Script Library for Telegram, edition 3rd.

[![Netlify Status](https://api.netlify.com/api/v1/badges/76bd2cdb-6128-489b-9172-73f2aca1f978/deploy-status)](https://app.netlify.com/sites/gaslib/deploys)

## ID Library

Frist Release : `10 Agustus 2021` / `1 Muharam 1443 H`

### lumpia

This is stable release

- Legacy: `MUD_wfLskZT2D99lRXLh94vvg_do21SJR`
- New: `1Yo6vQRwjG5Gl9jeEF0g2tBTUa0XN5MyT4G_HeDpRr9DvabxhRcSdhPNj`


## Quick Start

```javascript
const bot = new lumpia.init(tokenbot);

function doPost(e) {
  bot.doPost(e);
}

bot.start(ctx => ctx.reply('Lets Go'));
bot.cmd('ping', ctx => ctx.replyIt('Pong!'));
bot.hears(/hai/i, ctx => ctx.replyIt('Hi too!'));
```

## Docs

- [lumpia.js.org](https://lumpia.js.org)

## Community

- Telegram Group [@botIndonesia](https://t,.me/botindonesia)