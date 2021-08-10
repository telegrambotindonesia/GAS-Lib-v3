const Helper = {
    typeCheck(value) {
        const return_value = Object.prototype.toString.call(value);
        // we can also use regex to do this...
        const type = return_value.substring(
            return_value.indexOf(" ") + 1,
            return_value.indexOf("]"));

        return type.toLowerCase();
    },

    /**
     * Checks if a given object has a property with a given name.
     *
     * Example invocation:
     * let obj = { 'foo': 'bar', 'baz': () => {} }
     * hasProp(obj, 'foo') // true
     * hasProp(obj, 'baz') // true
     * hasProp(obj, 'abc') // false
     *
     * @param obj An object to test
     * @param prop The name of the property
     */

    hasProp(obj, prop) {
        return obj && prop in obj;
    },

    /**
     * Checks if a given object has a property with a given name.
     * Furthermore performs a `typeof` check on the property if it exists.
     *
     * Example invocation:
     * let obj = { 'foo': 'bar', 'baz': () => {} }
     * hasPropType(obj, 'foo', 'string') // true
     * hasPropType(obj, 'baz', 'function') // true
     * hasPropType(obj, 'abc', 'number') // false
     *
     * @param obj An object to test
     * @param prop The name of the property
     * @param type The type the property is expected to have
     */
    hasPropType(obj, prop, type) {
        // eslint-disable-next-line valid-typeof
        return hasProp(obj, prop) && type === typeof obj[prop];
    },

    compactOptions(options) {
        if (!options) {
            return options;
        }
        const keys = Object.keys(options);
        const compactKeys = keys.filter((key) => options[key] !== undefined);
        const compactEntries = compactKeys.map((key) => [key, options[key]]);
        return Object.fromEntries(compactEntries);
    },

    replacer(_, value) {
        if (value == null)
            return undefined;
        return value;
    },

    isIn(array, index) {
        return (array.indexOf(index) > -1);
    },

    forEach: function (obj, fn) {
        // Don't bother if no value provided
        if (obj === null || typeof obj === 'undefined') {
            return;
        }

        // Force an array if not already something iterable
        if (this.typeCheck(obj) !== 'object') {
            /*eslint no-param-reassign:0*/
            obj = [obj];
        }

        if (this.typeCheck(obj) == 'array') {
            // Iterate over array values
            for (var i = 0, l = obj.length; i < l; i++) {
                fn.call(null, obj[i], i, obj);
            }
        } else {
            // Iterate over object keys
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    fn.call(null, obj[key], key, obj);
                }
            }
        }
    },

    random: function () {
        // random(list) : item
        if (arguments.length === 1 && this.typeCheck(arguments[0]) == 'array') {
            var list = arguments[0];
            return list[Math.floor((Math.random() * list.length))];
        }

        // random(min, max) : integer
        if (arguments.length === 2 && typeof (arguments[0]) === 'number' && typeof (arguments[1]) === 'number') {
            var min = arguments[0];
            var max = arguments[1];
            if (max < min) { [min, max] = [max, min]; }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return false;
    },

    //  blob = textBlob('namaFile', 'Hasanudin H Syafaat')
    textBlob: function (namaFile, isiText, ext = '.txt', mime = MimeType.PLAIN_TEXT) {
        return Utilities.newBlob('')
            .setDataFromString(isiText)
            .setName(namaFile + ext)
            .setContentType(mime);
    },

    outputText: function (text) {
        return ContentService.createTextOutput(text);
    },

    outputJSON: function (data) {
        return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
    },

    outputHTML: function (text) {
        return HtmlService.createHtmlOutput(text);
    },
    /**
    Membersihkan tag HTML
    @param {string} text yang akan dibersihkan
    */
    clearHTML: function (s) {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    },

    /**
    Membersihkan tag Markdown
    @param {string} text yang akan dibersihkan
    */
    clearMarkdown: function (s) {
        return s
            .replace(/_/g, "\\_")
            .replace(/\*/g, "\\*")
            .replace(/\[/g, "\\[")
            .replace(/`/g, "\\`");
    },

    nama(data) {
        let first = data.first_name;

        let fullname = first;
        let last = data.last_name || false;
        if (last) fullname += ' ' + last;
        let html = '<b>' + this.clearHTML(fullname) + '</b>';
        // tambahkan username jika punya
        let username = data.username ? data.username : false;

        if (username) html += ' @' + username;

        return {
            first,
            last,
            fullname,
            username,
            html,
        }
    },

    name(...args) {
        return this.nama(...args);
    },

}

var Button = {
    text: function (text, data, hide = false) {
        return { text, callback_data: data, hide }
    },
    // inline = alias dari text
    inline: function (text, data, hide = false) {
        return { text, callback_data: data, hide }
    },
    query: function (text, data) {
        return {
            text,
            switch_inline_query: data
        }
    },
    url: function (text, url, hide = false) {
        return { text, url, hide }
    }
}

var helper = Helper;
var button = Button;