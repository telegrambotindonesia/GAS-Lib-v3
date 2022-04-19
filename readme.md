## GAS Lib v3

Google Apps Script Library for Telegram, 3rd edition.

![version](https://img.shields.io/badge/version-3.10-important) ![netifly](https://img.shields.io/netlify/76bd2cdb-6128-489b-9172-73f2aca1f978) ![GitHub last commit](https://img.shields.io/github/last-commit/telegrambotindonesia/GAS-Lib-v3) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/telegrambotindonesia/GAS-Lib-v3) ![Lines of code](https://img.shields.io/tokei/lines/github/telegrambotindonesia/GAS-Lib-v3) ![GitHub issues](https://img.shields.io/github/issues/telegrambotindonesia/GAS-Lib-v3) ![GAS](https://img.shields.io/badge/google-apps%20script-blue) ![lang count](https://img.shields.io/github/languages/count/telegrambotindonesia/GAS-Lib-v3) ![javascript](https://img.shields.io/badge/lang-javascript-yellow) ![GitHub Discussions](https://img.shields.io/github/discussions/telegrambotindonesia/GAS-Lib-v3?color=red&label=comments) ![telegram botindonesia](https://img.shields.io/badge/telegram-@botindonesia-blue) ![GitHub contributors](https://img.shields.io/github/contributors/telegrambotindonesia/GAS-Lib-v3) ![visit](https://badges.pufler.dev/visits/telegrambotindonesia/GAS-Lib-v3) [![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)


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