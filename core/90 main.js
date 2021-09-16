/*
    kelas utama gas lib v3
    matoa / bapia / lumpia
*/

class Main extends Composer {
    constructor(token, options = {}) {
        super();
        this.ctx = false;
        this.options = {
            prefix_command: '/',
            ...options
        }
        this.telegram = new Telegram(token);
    }

    get token() {
        return this.telegram.token;
    }

    get tg() {
        return this.telegram;
    }

    set log_id(id) {
        this.options.log_id = id;
    }

    handleUpdate(update) {
        // handle update tidak dibuatkan handle error
        // jika ingin direct handleUpdate, gunakan try catch sendiri
        if (verbose) console.log('Update: ' + update);
        const ctx = new Context(update, this.telegram);
        this.handler[0](ctx, this.execute(ctx));
        this.execTrigger();
    }

    doPost(e) {
        if (!e) return console.log("Don't run doPost without love.. ^^");
        if (verbose) console.log('Processing update');

        // handle error
        try {
            let update;
            if (e.postData.type == "application/json") {
                update = JSON.parse(e.postData.contents);
                if (!update) throw Error('Update invalid data.');
                if (DEBUG && this.options.log_id) return this.telegram.sendMessage(this.options.log_id, update);
            }

            return this.handleUpdate(update);

        } catch (e) {
            if (this.options.log_id) {
                try {
                    if (verbose) console.log('Error: ' + e.message);
                    return this.telegram.sendMessage(this.options.log_id, 'Error: ' + e.message);
                } catch (ee) {
                    // error karena gak bisa kirim log ke akun telegram
                    throw Error(ee);
                }
            }
            // error karena handle post
            throw Error(e);
        }

    }
}

var init = Main;