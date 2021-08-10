var token = '1234:abcedefghij';

const adminbot = 213567634; // your id
const bot = new lumpia.init(token, { log_id: adminbot, prefix_command: '!/.' });

function doPost(e) {
  bot.doPost(e);
}

const button = lumpia.button,
  markup = lumpia.markup,
  helper = lumpia.helper;

// middleware
bot.use((ctx, next) => {
  ctx.state.hooked = true;
  next();
})

bot.cmd('hook', (ctx) => {
  console.log(`Semua pesan ${ctx.state.hooked ? 'berhasil' : 'gagal'} dihooked!`);
})


bot.start(ctx => {
  // susun tombol keyboardnya, 1 dimensi array saja oke
  let keyboard = [
    button.url('📚 Materi Bot', 'http://gg.gg/gasbot'),
    button.url('👥 @botindonesia', 'https://t.me/botindonesia'),
    button.text('😼 Halo Human', 'me_click')
  ];

  // susun inline keyboardnya pakai markup, dengan jumlah kolom 2 jajar
  let inlineKeyboard = new markup().inlineKeyboard(keyboard, { columns: 2 });

  // reply dengan HTML
  ctx.replyWithHTML(`🙋🏻‍♀️ Hai, ${helper.nama(ctx.from).html} perkenalkan aku ini bot.\n\n🛠 Dibuat dengan <b>${lumpia.version.name}</b> <code>${lumpia.version.full}</code>`,
    { reply_markup: inlineKeyboard });
})

// handle jawaban ketika button di klik
bot.action('me_click', (ctx) => {
  ctx.answerCallbackQuery('✊🏼 Tetap semangat dan terus berkarya!');
})


// deteksi foto
bot.on('photo', (ctx) => {
  let detail = [];
  ctx.message.photo.forEach(f => {
    let data = 'file_unique_id: ' + f.file_unique_id;
    data += '\n ├ file_id: ' + f.file_id;
    data += '\n ├ size: ' + f.file_size + ' bytes';
    data += `\n └ res: ${f.width}x${f.height} px`;
    detail.push(data);
  })
  ctx.replyIt(detail.join('\n\n'));
})

bot.cmd('photo', (ctx) => {
  ctx.replyWithPhoto('https://avatars.githubusercontent.com/u/5436959?v=40', { caption: 'bukan raja Arthur yang bersama bayangan pedang' })
})

bot.cmd('ping', (ctx) => {
  let time_start = Date.now();
  let res = ctx.replyIt('..pong!');
  let time_stop = Date.now();

  let time_delta = (time_stop - time_start) / 1000; // mili detik
  let time = new Intl.NumberFormat('id').format(time_delta); // jadiin detik, sekaligus di format

  let msg_id = res.result.message_id;

  bot.telegram.editMessageText(ctx.from.id, msg_id, null, `<b>Pong!</b> Proses <code>${time}</code> detik.`, { parse_mode: 'html' });
})

bot.hears(/balik (.+)/i, (ctx) => ctx.reply(ctx.match[1].split('').reverse().join('')));