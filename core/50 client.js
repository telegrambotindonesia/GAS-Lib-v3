/*
    Handle request dan respon API Telegram
    biasa disebut sebagai API Telegram Client

    Otomatisasi params bertipe JSON dan Blob
    tidak ada lagi pemisahan request dan requestForm
*/

// tipe data yang wajib bertipe JSON
const FORM_DATA_JSON_FIELDS = [
    'results',
    'reply_markup',
    'mask_position',
    'shipping_options'
];

// tipe yang berpotensi memiliki data bertipe blob
// dikarenakan GAS tidak bisa mendeteksi secara langsung tipe blob
// sehingga dibuat perkiraan field
// --> sudah ditemukan, tapi males ngubah codingan
// --> https://stackoverflow.com/questions/68665661/google-apps-script-how-detect-typeof-blob
const BLOB_FIELDS = [
    'thumb',
    'photo',
    'audio',
    'document',
    'video',
    'animation',
    'video_note',
    'sticker',
    'png_sticker',
    'tgs_sticker',
    'certificate',

];

// belum diimplementasikan
const DEFAULT_EXTENSIONS = {
    audio: 'mp3',
    photo: 'jpg',
    sticker: 'webp',
    video: 'mp4',
    animation: 'mp4',
    video_note: 'mp4',
    voice: 'ogg',
};

class Client {
    // v3 dipantek ke API Official
    constructor() {
        this.urlApi = 'https://api.telegram.org/bot';
    }

    callApi(method, data = {}) {
        if (!this.token) {
            throw new Error('Bot Token is required')
        }
        if (!method) {
            throw new Error('Method is required')
        }

        try {
            let options = maybeBlob(data)
                ? this.buildFormData(data)
                : this.buildJSON(data);


            let response = UrlFetchApp.fetch(this.urlApi + this.token + '/' + method, options);
            if (response.getResponseCode() == 200) {
                let result = JSON.parse(response.getContentText());
                if (verbose) {
                    console.log(method + ' Result:')
                    console.log(result);
                }
                return result;
            }
        } catch (error) {
            throw Error(error.message);
        }

    }

    buildJSON(payload) {
        payload = JSON.stringify(payload, helper.replacer);
        if (verbose) console.log('build json: ' + payload);
        return {
            method: 'POST',
            contentType: 'application/json',
            payload
        };
    }

    buildFormData(payload) {
        if (dev) console.log('build form');
        for (const field of FORM_DATA_JSON_FIELDS) {
            if (helper.hasProp(payload, field) && typeof payload[field] !== 'string') {
                payload[field] = JSON.stringify(payload[field]);
            }
        }

        Object.keys(payload).forEach(key => {
            if (typeof payload[key] == 'number') payload[key] = String(payload[key]);
        })

        if (dev) console.log(JSON.stringify(payload));

        return {
            method: 'post',
            payload
        };
    }
}

// metode baru deteksi
// belum / tidak diimplementasikan dulu
function isAttachBlob(payload) {
    if (!payload) return false;
    let result = false;
    helper.forEach(payload, key => {
        if (helper.hasProp(payload[key], 'copyBlob') && typeof payload[key].copyBlob === 'function') result = true;
    });
    return result;
}

// saat ini: pakai metode yang ini
// meprediksi isinya blob atau bukan
function maybeBlob(payload) {
    if (!payload) return false;
    let result = false;
    for (const field of BLOB_FIELDS)
        if (helper.hasProp(payload, field))
            if (!helper.isIn(['string', 'number'], helper.typeCheck(payload[field]))) result = true;

    return result;
}

// deteksi ada media kah
// saat ini belum diimplementasikan
function includesMedia(payload) {
    return Object.values(payload).some((value) => {
        if (Array.isArray(value)) {
            return value.some(({ media }) => media && typeof media === 'object' && (media.source || media.url));
        }
        return (value &&
            typeof value === 'object' &&
            ((helper.hasProp(value, 'source') && value.source) ||
                (helper.hasProp(value, 'url') && value.url) ||
                (helper.hasPropType(value, 'media', 'object') &&
                    ((helper.hasProp(value.media, 'source') && value.media.source) ||
                        (helper.hasProp(value.media, 'url') && value.media.url)))));
    });
}