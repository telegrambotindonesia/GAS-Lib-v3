/*

GASLibv3
----------------
Public Release

GAS Library untuk Telegram versi 3

Adalah GAS Library untuk Telegram edisi ke tiga, merupakan suksesi
dari GAS Library Telegram sebelumnya, edisi 1 dan edisi 2
yang (alhamdulillah) banyak pemakainya.

GAS Lib v3 ini terinspirasi dari Telegraf yang dirasa cukup praktis
dalam penggunaan sehari-hari dan banyak dilakukan penyesuaian.

Support hanya via komunitas di Grup Telegram @botindonesia
atau via issues GITHUB
contact personal hanya untuk proyek, client, teman / sahabat, atau keluarga

Kanal khusus info release @GASindonesia

Docs URL: https://lumpia.js.org
Donasi: https://saweria.co/hasanudinhs
----------------

Release public pertama kali : 
- 10 Agustus 2021 / 1 Muharam 1443 H
================

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

// const active = 'alpha';
// const active = 'beta';
const active = 'stable';

const app = {
    alpha: {
        name: 'matoa',
        build: 1,
        // matoa tidak memiliki id, karena pakai mode develop langsung di run
        // dan tidak pernah di build
    },
    stable: {
        name: 'lumpia',
        build: 9,
        id: {
            legacy: 'MUD_wfLskZT2D99lRXLh94vvg_do21SJR',
            new: '1Yo6vQRwjG5Gl9jeEF0g2tBTUa0XN5MyT4G_HeDpRr9DvabxhRcSdhPNj'
        }
    },
    beta: {
        name: 'bapia',
        build: 13,
        id: {
            legacy: 'M2iDAxzI3JJ4n6a8sryWJsfvg_do21SJR',
            new: '1OSN8eNlJtw2ehf3ul7h48Jb8rdeljKhC5Rw3cJo4nkEFITdS01Di0N_S'
        }
    },
}

var version = {
    active,
    number: 3,
    name: app[active].name,
    build: app[active].build,
    full: 'GAS Lib v3.' + app[active].build + (dev ? '-dev' : ''),
    group: '@botindonesia',
    url: 'https://lumpia.banghasan.com'
}

// show logger log
var verbose = false;

// hook all message show json
var DEBUG = false

