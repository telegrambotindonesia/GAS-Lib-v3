const bot = new lumpia.init(token, { log_id: 12345 });

function doPost(e) {
  bot.doPost(e);
}

bot.command(['ver', 'versi', 'version'], ctx => {
  let message;
  message = `š  Dibangun menggunakan GASLibv3\n\nš¦ <code>${lumpia.version.full}</code>-<b>${lumpia.version.name}</b>`;
  message += `\nš <a href="${lumpia.version.url}">Github</a> | š„ @botindonesia`;

  return ctx.replyWithHTML(message, { disable_web_page_preview: true })
});