## GAS Lib v3

Google Apps Script Library for Telegram, edition 3rd.


![version](https://img.shields.io/badge/version-3.6-important) ![netifly](https://img.shields.io/netlify/76bd2cdb-6128-489b-9172-73f2aca1f978) ![GitHub last commit](https://img.shields.io/github/last-commit/telegrambotindonesia/GAS-Lib-v3) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/telegrambotindonesia/GAS-Lib-v3) ![GitHub issues](https://img.shields.io/github/issues/telegrambotindonesia/GAS-Lib-v3) ![GAS](https://img.shields.io/badge/google-apps%20script-blue) ![javascript](https://img.shields.io/badge/lang-javascript-yellow) ![telegram botindonesia](https://img.shields.io/badge/telegram-@botindonesia-blue) ![visit](https://badges.pufler.dev/visits/telegrambotindonesia/GAS-Lib-v3)

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

bot.hears(/hello/i, ctx => ctx.reply('Hello too!'));

bot.hears(/^\/say (.*)/i, ctx => ctx.replyIt(ctx.match[1]));
```

## Docs

- [lumpia.js.org](https://lumpia.js.org)

## Community

- Telegram Group [@botIndonesia](https://t,.me/botindonesia)