const bot = new lumpia.init(token, { log_id: 12345 });

function doPost(e) {
  bot.doPost(e);
}

bot.start(ctx => {
  let message = "Bot telah di-start!";
  if (ctx.payload) message += '\nDengan payload: ' + ctx.payload;
  ctx.reply(message);
})