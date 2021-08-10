const bot = new lumpia.init(token, { log_id: 12345 });

function doPost(e) {
  bot.doPost(e);
}

bot.command(['ver', 'versi', 'version'], ctx => {
  let message;
  message = `🛠 Dibangun menggunakan GASLibv3\n\n🍦 <code>${lumpia.version.full}</code>-<b>${lumpia.version.name}</b>`;
  message += `\n🔖 <a href="${lumpia.version.url}">Github</a> | 👥 @botindonesia`;

  return ctx.replyWithHTML(message, { disable_web_page_preview: true })
});