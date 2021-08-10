// daftar field yang tidak dibroadcast
FIELD_NOT_BC = [
    'update_id',
    'message_id',
    'from',
    'chat',
    'date'
];

function escapeRegExp(s) {
    // $& means the whole matched string
    return s.replace(/[.*+\-?^${}()|[\]\\\/]/g, '\\$&')
}

class Composer extends EventEmitter {
    constructor() {
        super();
        this.handler = [(ctx, next) => { next() }];
        this.trigger = [];
    }

    /**
     * Registers a middleware.
     */
    use(...fns) {
        this.compose(...fns);
    }

    // alias for use
    middleware(...fns) {
        this.compose(...fns);
    }


    // -- konsep event

    // command( ['anu', 'ani'], (ctx, next) => {})
    cmd(keys, callback) {
        return this.addTrigger('text', this.setRegex(keys, true), callback);
    }

    // alias cmd
    command(...args) {
        this.cmd(...args);
    }

    start(callback) {
        let regex = new RegExp(`^(?<cmd>[${escapeRegExp(this.options.prefix_command)}]start)\\s?(?<payload>.+)?`, 'i');
        return this.addTrigger('text', regex, callback);
    }

    hear(keys, callback) {
        return this.addTrigger('text', this.setRegex(keys), callback);
    }

    // alias hear
    hears(...args) {
        this.hear(...args)
    }

    // handle callback
    action(keys, callback) {
        return this.addTrigger('action', this.setRegex(keys), callback);
    }

    // handle trigger: cmd, hear, action
    addTrigger(type, keys, callback) {
        keys = this.setRegex(keys);
        let data = {
            type, keys,
            callback
        }
        return this.trigger.push(data);
    }

    // eksekusi seluruh trigger
    execTrigger(index = 0) {
        let trigger = this.trigger;
        if (!trigger[index]) return;
        if (verbose) console.log('>> Trigger[' + index + ']: ' + trigger[index].keys.join(', '));

        let update = this.ctx;
        let { type, keys, callback } = trigger[index];

        let msg;
        if (type == 'text') {
            msg = update.message ?? update.channelPost;
        }
        if (type == 'action') {
            msg = update.callbackQuery;
        }

        let text = this.getText(msg);
        if (!text) return this.execTrigger(index + 1);

        let match, payload;
        keys.forEach(key => {
            // if (verbose) console.log(key + ' vs ' + text);
            let m = key.exec(text);
            if (m) {
                match = m;
                if (m.groups && m.groups.payload) payload = m.groups.payload;
            }
        });

        if (match) {
            update.match = match;
            if (payload) update.payload = payload;
            return callback(update, () => this.execTrigger(index + 1));
        }

        return this.execTrigger(index + 1);
    }


    // --- pembuatan middleware (dipisah, biar ga rumit ^^)
    compose(...fns) {
        if (!fns) return;
        fns.forEach(fn => {
            if (typeof fn === 'function') this.handler.push(fn);
        });
    }

    // -- eksekusi middleware
    execute(update, index = 1) {
        let handler = this.handler || [];
        if (handler.length === 0) {
            this.ctx = update;
            return this.broadcast();
        }
        return () => {
            if (!handler[index]) {
                this.ctx = update;
                return this.broadcast();
            }
            return this.handler[index](update, this.execute(update, index + 1));
        }
    }

    // --- fungsi-fungsi

    setRegex(keys, prefix = false) {
        if (!Array.isArray(keys)) keys = [keys];
        return keys.map((key) => {
            if (!key) {
                throw new Error('Invalid trigger');
            }
            if (typeof key === 'function') {
                throw new Error('Invalid trigger');
            }

            // if (key instanceof RegExp) return key;
            let type = helper.typeCheck(key);
            if (type == 'regexp') return key;

            if (type == 'string' || type == 'number' ) {
                //
            } else { 
                throw Error('Invalid key.');
            }

            let regex = prefix
                ? new RegExp(`^[${escapeRegExp(this.options.prefix_command)}]${escapeRegExp(key)}$`, 'i')
                : new RegExp(`^${escapeRegExp(key)}$`);
            return regex;
        });
    }

    getText(msg) {
        /* if (!update) return undefined;
        let msg = update.message ?? update.channelPost ?? update.callback_query */
        if (!msg) return undefined;
        if ('caption' in msg) return msg.caption;
        if ('text' in msg) return msg.text;
        if ('data' in msg) return msg.data;
        if ('game_short_name' in msg) return msg.game_short_name;
        return undefined;
    }

    // membroadcast event on
    broadcast() {
        let bc = {};
        let ctx = this.ctx;
        let update = ctx.update;
        Object.keys(update).forEach(updateType => bc[updateType] = 1);
        if (update.message) {
            let msg = update.message;
            Object.keys(update.message).forEach(updateSubType => bc[updateSubType] = 1);
            let entities = msg.entities ?? msg.caption_entities;
            if (entities) {
                Object.values(entities).forEach(entity => bc[entity.type] = 1)
            }
        }

        let broadcasters = [];
        for (let key in bc) {
            if (FIELD_NOT_BC.indexOf(key) >= 0) continue;
            broadcasters.push(key);
        }
        ctx.broadcast = broadcasters;
        if (broadcasters.length > 0) this.emit(broadcasters, ctx);
        if (verbose) console.log('broadcast: ' + broadcasters.join(', '));
    }

}