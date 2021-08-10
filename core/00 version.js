/*

GASLibv3
----------------
Public Release

GAS Library untuk Telegram versi 3

Adalah GAS Library untuk Telegram edisi ke tiga, merupakan suksesi
dari GAS Library Telegram sebelumnya, edisi 1 dan edisi 2
yang telah sukses banyak pemakainya.

GAS Lib v3 ini terinspirasi dari Telegraf yang dirasa cukup praktis
dalam penggunaan sehari-hari.

Support komunitas di Grup Telegram @botindonesia
Kanal khusus GAS Indonesia @GASindonesia

Release public pertama kali : 
- 10 Agustus 2021 / 1 Muharam 1443 H

*/


/*
    Penamaan

    stabil diberi nama lumpia
    sedangkan beta, diberi nama bapia

    Versi mayor adalah versi 3. 
    Dimana nomor 3 adalah generasi atau edisi ke-3 dari Library GAS untuk Telegram ini.

    Versi minor adalah versi build. Yang akan terus bertambah meski hanya sedikit perbaikan.

*/

const dev = false;

//const active = 'alpha';
const active = 'beta';
//const active = 'stable';

const app = {
    alpha: {
        name: 'matoa',
        build: 1,
    },
    beta: {
        name: 'bapia',
        build: 4,
        id: {
            legacy: 'M2iDAxzI3JJ4n6a8sryWJsfvg_do21SJR',
            new: '1OSN8eNlJtw2ehf3ul7h48Jb8rdeljKhC5Rw3cJo4nkEFITdS01Di0N_S'
        }
    },
    stable: {
        name: 'lumpia',
        build: 1,
        id: {
            legacy: 'M8TSsh_jLA7IF9z56e2gGo_vg_do21SJR',
            new: '1fY_uq7bVUj_3VjQmYzizNt8rCVG11PeDvTC2OsbmHL_30tj34oCFdxnT'
        }
    }
}

var version = {
    active,
    number: 3,
    name: app[active].name,
    build: app[active].build,
    full: 'GASLibv3.' + app[active].build + (dev ? '-dev' : ''),
    group: '@botindonesia',
    url: 'https://github.com/telegrambotindonesia/GAS-Lib-v3'
}

// show logger log
var verbose = false;

// hook all message show json
var DEBUG = false

// biar gak keliru ma versi lokal
// console diubah dulu jadi Logger

// simpan console lama
const _console = console;

// ganti dengan Logger
console = Logger;

/*
 Note: karena udah diubah jadi Logger, maka harus berhati-hati

 console.log('satu', 'dua'); // dua tidak keluar
 console.log('satu' + 'dua'); // <- harus dibeginiin
*/