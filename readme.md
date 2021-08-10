## GAS Lib v3

Google Apps Script Library for Telegram, edition 3rd.

## Pengantar

### GAS Library edisi ke-3 

Adalah Library **Google Apps Script** ([GAS]) untuk [Telegram] edisi ke-3, merupakan suksesi dari GAS Library sebelumnya, yakni GASLib edisi 1 dan edisi 2 [Lib v2] yang telah berhasil banyak dimanfaatkan.

Terinspirasi dari [Telegraf](https://telegraf.js.org/) yang dirasa cukup praktis dan efektif pada penggunaan sehari-hari. **GASLibv3** membuat karakteristiknya sendiri, lantaran coding pada GAS memiliki banyak keterbatasan seperti tidak support proses (true) async, promise, deteksi tipe blob / stream, tidak banyak paket _ready_ yang bisa langsung diberdayakan, dan berbagai kendala lainnya.

Namun, tidak perlu bekecil hati, framework **GASLibv3** ini _insyaAllah_, lebih dari cukup guna kebutuhan sebuah proyek dalam skala kecil hingga menengah. Ditambah dukungan yang cukup besar dan baik pada komunitas Grup Telegram [@botIndonesia].

Pada edisi ini, terdapat perubahan cukup besar dan cukup signifikan secara struktur, konsep, dan penggunaan. Tidak lagi _seolah_ sebuah library namun menjadi sebuah framework sempurna dan modern untuk bot telegram. Dengan demikian, harapannya, penggunaan bisa menjadi lebih produktif untuk kebutuhan pekerjaan, kesenangan, maupun tools pembantu lainnya.

### Kompabilitas

Penggunaan dan syntax banyak yang berubah ya. Silakan rajin baca dokumentasi ini.

Ingat slogan kita semua.. __We love RTFM__ ❤️

> **PERINGATAN**: Bagi pengguna library versi 1 dan 2, ini tidak cocok. Selamat menyesuaikan!

## ID Pustaka

Release public pertama kali : `10 Agustus 2021` / `1 Muharam 1443 H`

### lumpia

Adalah versi stabil dari GASLibv3.

Semua dokumentasi menggunakan acuan ini.

- Legacy: `MUD_wfLskZT2D99lRXLh94vvg_do21SJR`
- New: `1VrueIocs0aRm3wpZvCgKkK5_7e_MvLSNYeftHm5JX_hgvkvgEoABl_JU`

### bakpia

adalah versi beta, digunakan hanya oleh pengembang buat bahan testing.

- Legacy: `M2iDAxzI3JJ4n6a8sryWJsfvg_do21SJR`
- New: `1Yo6vQRwjG5Gl9jeEF0g2tBTUa0XN5MyT4G_HeDpRr9DvabxhRcSdhPNj`


## Versi

### Nama 

Seperti halnya android, kita mengenal Kit Kat, Oreo, dlsb.

Maka, kode library ini diberi kode penamaan nama makanan yang ada di pasar. Jadi kalau dibahas jadi enak, kita ngobrolin makanan hehe..

### Nomor

Penomoran versi

Misalnya `v3.1`

- **Versi mayor** adalah versi `3`

Dimana nomor 3 adalah generasi atau edisi ke-3 dari Library GAS untuk Telegram ini. Versi ini tidak berubah, atau setidaknya tidak akan berubah dalam jangka dekat bilamana belum ada edisi baru lagi.

- **Versi minor** adalah `1`

Versi minor adalah versi build. Yang akan terus bertambah nilainya lantaran hasil snapshot dari release versi pada [GAS].

Jika terdapat nomor minor yang lompat (tidak ada), berarti dicabut rilisnya. Bisa jadi dikarenakan gagal / cacat, atau kesalahan teknis release.

## Quick Start

```javascript
// jika ingin menyembungikan token, gunakan userDB
const token = '123456789:abcdefghijklmnopqrstuvwxyz'; // ganti dengan token bot mu
const adminbot = 213567634; // ganti dengan id kamu

// inisiasi
const bot = new lumpia.init(token, { log_id: adminbot });
const helper = lumpia.helper;

// handle pesan POST
function doPost(e) {
  bot.doPost(e);
}

bot.start(ctx => ctx.reply('Started!'));

bot.cmd('ping', ctx => ctx.replyIt('Pong!'));

// user: helo, halo, haloooo
bot.hears(/h+[ae]+l+o+/i, ctx => ctx.replyIt('Halo juga!'));

```

contoh lainnya bisa di cek pada folder [examples](https://github.com/telegrambotindonesia/GAS-Lib-v3/tree/main/examples)

## Dokumentasi

Silakan diperuksa pada folder **docs**.

- __insyaAllah__ akan dibuatkan web khusus untuk dokumentasi ini.


### Method

_menyusul_

## Kontribusi

Dipersilakan bagi developer maupun end user untuk berkontribusi, bantu membangun sistem yang baik untuk dipakai bersama.

Jika kamu tertarik berkontribusi, silakan melakukan testing. Jika ada temuan atau ingin ditambahkan dalam pengembangan:

- Buat fork
- Bikin modifikasinya
- Kirim pull request

Harus disertakan keterangan ya.

## Komunitas

- Diskusi dan sharing via Grup Telegram [@botIndonesia]

Jika ada bugs, silakan [create issue](https://github.com/telegrambotindonesia/GAS-Lib-v3/issues/new/choose) pada repository.

[Telegram]: https://www.telegram.org
[GAS]: https://developers.google.com/apps-script
[@botIndonesia]: https://t.me/botindonesia
[Lib v2]: https://github.com/banghasan/Telegram-Lib-GAS-V2