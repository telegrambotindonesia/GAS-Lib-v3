const bot = new lumpia.init(token, { log_id: 12345 });

function doPost(e) {
  bot.doPost(e);
}

const button = lumpia.button,
  markup = lumpia.markup,
  helper = lumpia.helper;

// handle pesan POST
function doPost(e) {
  bot.doPost(e);
}

bot.start(ctx => {
  // susun tombol keyboardnya, 1 dimensi array saja oke
  let keyboard = [
    button.url('š Materi Bot', 'http://gg.gg/gasbot'),
    button.url('š„ @botindonesia', 'https://t.me/botindonesia'),
    button.text('š¼ Halo Human', 'me_click')
  ];

  // susun inline keyboardnya pakai markup, dengan jumlah kolom 2 jajar
  let inlineKeyboard = new markup().inlineKeyboard(keyboard, { columns: 2 });

  // reply dengan HTML
  ctx.replyWithHTML(`šš»āāļø Hai, ${helper.nama(ctx.from).html} perkenalkan aku ini bot.\n\nš  Dibuat dengan <b>${lumpia.version.name}</b> <code>${lumpia.version.full}</code>`,
    { reply_markup: inlineKeyboard });
})


// handle jawaban ketika button di klik
bot.action('me_click', (ctx) => {
  ctx.answerCallbackQuery('āš¼ Tetap semangat dan terus berkarya!');
})