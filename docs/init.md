# Base

## lumpia

Yang dipergunakan dalam dokumentasi ini adalah versi stabil, yakni `lumpia`.

huruf besar kecil adalah beda (pengaruh) pada saat coding.

### init

Inisiasi saat pertama kali lumpia dipanggil.

syntax: `lumpia.init(token, options)`

Parameter:

- **token** (wajib) adalah token bot yang di dapat dari @botfather
- _options_ dalam format JSON:
    - `prefix_command` default `/`
    - `log_id` diisi id user/grup/channel. Jika ada error saat menjalankan program, akan dikirim ke log_id ini.

```javascript
const token = '123456:abcde';
const adminbot = 963852741;
const bot = lumpia.init(token, {
    log_id: adminbot,
    prefix_command: '.!/'
});
```    

### button

bantuan untuk saat membuat button keyboard inline

- `text(text, data, hide=false)`
- `url(text, url, hide=false)`

untuk bantuan markup lainnya, cek pada method **markup**.

### DEBUG

Memaksa bot menampilkan JSON **apapun** yang diterima ke `log_id` yang diseting saat pertama kali init. 

Berguna untuk debugging isi message.

- default: `false`

### fetch

periksa pada panduan fetch

### userDB

merupakan kelas pengakses properti user.
periksa halaman **userDB**

### helper

periksa halaman helper

### markup

periksa halaman markup

### verbose

mengaktifkan informasi logging saat menjalankan fungsi pada editor.

- default: `false`;

```javascript
lumpia.verbose = true;
```

### version

berupa tipe data json bersifat informasi.

- `active` versi yang aktif saat ini
- `number` selalu `3`, sesuai generasi yang direlease
- `build` nomor saat di build, terus bertambah
- `name` nama code library
- `full` penyebuatan secara penuh

```javascript
let versi_info = `Bot ini dibuat dengan menggunakan lumpia ${lumpia.version.full}`;
Logger.log(versi_info);
```