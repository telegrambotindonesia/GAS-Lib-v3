const bot = new lumpia.init(token, { log_id: 12345 });

function doPost(e) {
  bot.doPost(e);
}

bot.cmd('ping', (ctx, next) => {
  let time_start = Date.now();
  let res = ctx.replyIt('..pong!');
  let time_stop = Date.now();

  let time_delta = (time_stop - time_start) / 1000; // mili detik
  let time = new Intl.NumberFormat('id').format(time_delta); // jadiin detik, sekaligus di format

  let msg_id = res.result.message_id;

  bot.telegram.editMessageText(ctx.chat.id, msg_id, null, `<b>Pong!</b> Proses <code>${time}</code> detik.`, { parse_mode: 'html' });
})