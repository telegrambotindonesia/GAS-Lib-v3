/**
 * Simple method fetch untuk REST API pada Google App Scripts
 * 
 * Hasanudin H. Syafaat
 * TG @hasanudinhs
 * Email banghasan@gmail.com
 * 
 * Support hanya di grup Telegram @botIndonesia
 * 
 * Code date: 20 Februari 2021
 * 
 * @param {String} url 
 */

function Fetch(url = false) {
    this.req = { url: url, uri: '', options: { method: 'get' } },
        this.req.url = url;
    this.result = false
}

Fetch.prototype = {

    setHeaders: function (headers) {
        return this.req.options.headers = headers;
    },

    setContentType: function (contentType) {
        return this.req.options.contentType = contentType;
    },

    setMethod: function (method) {
        return this.req.options.method = method;
    },

    setUrl: function (url) {
        return this.req.url = url;
    },

    getUrl: function () {
        return this.req.url;
    },

    // request(url, options)
    request: function () {
        var url = arguments[0] ? arguments[0] : this.req.url + this.req.uri;
        var options = arguments[1] ? arguments[1] : this.req.options;
        if (!url) return false;
        this.result = UrlFetchApp.fetch(url, options);
        var dJSON = JSON.parse(this.result);
        if (dJSON) this.result = dJSON;
        return this.result;
    },

    // addQuery({cari: "kata", khusus: "ya"}) : ?cari=kata&khusus=ya
    addQuery: function (obj) {
        return Object.keys(obj).reduce(function (p, e, i) {
            return p + (i == 0 ? "?" : "&") +
                (Array.isArray(obj[e]) ? obj[e].reduce(function (str, f, j) {
                    return str + e + "=" + encodeURIComponent(f) + (j != obj[e].length - 1 ? "&" : "")
                }, "") : e + "=" + encodeURIComponent(obj[e]));
        }, "");
    },

    /* toJSON: function () {
        if (!this.result) return false;
        return JSON.parse(this.result);
    }, */

    // get(url), get(uri)
    // get(url, uri)
    get: function () {
        this.req.options.method = 'get';

        // get(url), get(uri), get(obj)
        if (arguments.length >= 1) {

            if (typeof arguments[0] === 'string') {
                // jika url
                if (/^https?:\/\//i.exec(arguments[0])) {
                    this.req.url = arguments[0];
                } else {
                    // url harus ada isinya terlebih dahulu
                    if (!this.req.url) return false;
                    this.req.uri = arguments[0];
                }
            }

            // jika objek {cari: "kata"}
            if (typeof arguments[0] === 'object') {
                if (!this.req.url) return false;
                if (this.req.uri === '') {
                    this.req.uri = this.addQuery(arguments[0]);
                } else {
                    this.req.uri += this.addQuery(arguments[0]);
                }

            }
        }

        // get(url, data), get(uri, data)
        if (arguments.length >= 2) {
            // jika objek {cari: "kata"}
            if (typeof arguments[1] === 'object') {
                if (this.req.uri === '') {
                    this.req.uri = this.addQuery(arguments[1]);
                } else {
                    this.req.uri += this.addQuery(arguments[1]);
                }
            }
        }

        return this.request();
    },

    post: function () {
        this.req.options.method = 'post';
        var isJSON = false;

        // post(url), post(uri), post(data)
        if (arguments.length >= 1) {

            if (typeof arguments[0] === 'string') {
                // jika url
                if (/^https?:\/\//i.exec(arguments[0])) {
                    this.req.url = arguments[0];
                    this.req.uri = '';

                    // jika uri
                } else {
                    // url harus ada isinya terlebih dahulu
                    if (!this.req.url) return false;
                    this.req.uri = arguments[0];
                }
            }

            if (typeof arguments[0] === 'object') {
                var data = arguments[0];
            }

        }

        // post(url|uri, data) post(data, isJSON)
        if (arguments.length >= 2) {

            if (typeof arguments[1] === 'object') {
                var data = arguments[1];
            }

            if (typeof arguments[1] === 'boolean') {
                var isJSON = arguments[1];
            }
        }

        // post(url|uri, data, isJSON)
        if (arguments.length >= 3) {
            if (typeof arguments[2] === 'boolean') {
                var isJSON = arguments[2];
            }
        }

        if (isJSON) {
            this.req.options.contentType = 'application/json';
            this.req.options.payload = JSON.stringify(data);
        } else {
            this.req.options.payload = data;
        }

        return this.request();
    }

}

var fetch = Fetch;