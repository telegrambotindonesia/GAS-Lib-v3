/*
    Helper tambahan type markup
    baik Keyboard biasa ataupun inline
    --
    jika rumit, gak usah dipakai
    gunakan metode jadul saja
*/

class Markup {
    forceReply(value = true) {
        this.force_reply = value
        return this
    }

    removeKeyboard(value = true) {
        this.remove_keyboard = value
        return this
    }

    selective(value = true) {
        this.selective = value
        return this
    }

    extra(options) {
        return {
            reply_markup: { ...this },
            ...options
        }
    }

    keyboard(buttons, options) {
        const keyboard = buildKeyboard(buttons, { columns: 1, ...options })
        if (keyboard && keyboard.length > 0) {
            this.keyboard = keyboard
        }
        return this
    }

    resize(value = true) {
        this.resize_keyboard = value
        return this
    }

    oneTime(value = true) {
        this.one_time_keyboard = value
        return this
    }

    inlineKeyboard(buttons, options) {
        const keyboard = buildKeyboard(buttons, { columns: buttons.length, ...options })
        if (keyboard && keyboard.length > 0) {
            this.inline_keyboard = keyboard
        }
        return this
    }

    button(text, hide) {
        return Markup.button(text, hide)
    }

    contactRequestButton(text, hide) {
        return Markup.contactRequestButton(text, hide)
    }

    locationRequestButton(text, hide) {
        return Markup.locationRequestButton(text, hide)
    }

    urlButton(text, url, hide) {
        return Markup.urlButton(text, url, hide)
    }

    callbackButton(text, data, hide) {
        return Markup.callbackButton(text, data, hide)
    }

    switchToChatButton(text, value, hide) {
        return Markup.switchToChatButton(text, value, hide)
    }

    switchToCurrentChatButton(text, value, hide) {
        return Markup.switchToCurrentChatButton(text, value, hide)
    }

    gameButton(text, hide) {
        return Markup.gameButton(text, hide)
    }

    payButton(text, hide) {
        return Markup.payButton(text, hide)
    }

    loginButton(text, url, opts, hide) {
        return Markup.loginButton(text, url, opts, hide)
    }

    static removeKeyboard(value) {
        return new Markup().removeKeyboard(value)
    }

    static forceReply(value) {
        return new Markup().forceReply(value)
    }

    static keyboard(buttons, options) {
        return new Markup().keyboard(buttons, options)
    }

    static inlineKeyboard(buttons, options) {
        return new Markup().inlineKeyboard(buttons, options)
    }

    static resize(value = true) {
        return new Markup().resize(value)
    }

    static selective(value = true) {
        return new Markup().selective(value)
    }

    static oneTime(value = true) {
        return new Markup().oneTime(value)
    }

    static button(text, hide = false) {
        return { text: text, hide: hide }
    }

    static contactRequestButton(text, hide = false) {
        return { text: text, request_contact: true, hide: hide }
    }

    static locationRequestButton(text, hide = false) {
        return { text: text, request_location: true, hide: hide }
    }

    static pollRequestButton(text, type, hide = false) {
        return { text: text, request_poll: { type }, hide: hide }
    }

    static urlButton(text, url, hide = false) {
        return { text: text, url: url, hide: hide }
    }

    static callbackButton(text, data, hide = false) {
        return { text: text, callback_data: data, hide: hide }
    }

    static switchToChatButton(text, value, hide = false) {
        return { text: text, switch_inline_query: value, hide: hide }
    }

    static switchToCurrentChatButton(text, value, hide = false) {
        return { text: text, switch_inline_query_current_chat: value, hide: hide }
    }

    static gameButton(text, hide = false) {
        return { text: text, callback_game: {}, hide: hide }
    }

    static payButton(text, hide = false) {
        return { text: text, pay: true, hide: hide }
    }

    static loginButton(text, url, opts = {}, hide = false) {
        return {
            text: text,
            login_url: { ...opts, url: url },
            hide: hide
        }
    }

    static formatHTML(text = '', entities = []) {
        const chars = [...text]
        const available = [...entities]
        const opened = []
        const result = []
        for (let offset = 0; offset < chars.length; offset++) {
            while (true) {
                const index = available.findIndex((entity) => entity.offset === offset)
                if (index === -1) {
                    break
                }
                const entity = available[index]
                switch (entity.type) {
                    case 'bold':
                        result.push('<b>')
                        break
                    case 'italic':
                        result.push('<i>')
                        break
                    case 'code':
                        result.push('<code>')
                        break
                    case 'pre':
                        if (entity.language) {
                            result.push(`<pre><code class="language-${entity.language}">`)
                        } else {
                            result.push('<pre>')
                        }
                        break
                    case 'strikethrough':
                        result.push('<s>')
                        break
                    case 'underline':
                        result.push('<u>')
                        break
                    case 'text_mention':
                        result.push(`<a href="tg://user?id=${entity.user.id}">`)
                        break
                    case 'text_link':
                        result.push(`<a href="${entity.url}">`)
                        break
                    case 'spoiler':
                        result.push('<span class="tg-spoiler">')
                        break
                }
                opened.unshift(entity)
                available.splice(index, 1)
            }

            result.push(chars[offset])

            while (true) {
                const index = opened.findIndex((entity) => entity.offset + entity.length - 1 === offset)
                if (index === -1) {
                    break
                }
                const entity = opened[index]
                switch (entity.type) {
                    case 'bold':
                        result.push('</b>')
                        break
                    case 'italic':
                        result.push('</i>')
                        break
                    case 'code':
                        result.push('</code>')
                        break
                    case 'pre':
                        if (entity.language) {
                            result.push('</code></pre>')
                        } else {
                            result.push('</pre>')
                        }
                        break
                    case 'strikethrough':
                        result.push('</s>')
                        break
                    case 'underline':
                        result.push('</u>')
                        break
                    case 'text_mention':
                    case 'text_link':
                        result.push('</a>')
                        break
                    case 'spoiler':
                        result.push('</span>')
                        break
                }
                opened.splice(index, 1)
            }
        }
        return result.join('')
    }
}

function buildKeyboard(buttons, options) {
    const result = []
    if (!Array.isArray(buttons)) {
        return result
    }
    if (buttons.find(Array.isArray)) {
        return buttons.map(row => row.filter((button) => !button.hide))
    }
    const wrapFn = options.wrap
        ? options.wrap
        : (btn, index, currentRow) => currentRow.length >= options.columns
    let currentRow = []
    let index = 0
    for (const btn of buttons.filter((button) => !button.hide)) {
        if (wrapFn(btn, index, currentRow) && currentRow.length > 0) {
            result.push(currentRow)
            currentRow = []
        }
        currentRow.push(btn)
        index++
    }
    if (currentRow.length > 0) {
        result.push(currentRow)
    }
    return result
}

class Extra {
    constructor(opts) {
        this.load(opts)
    }

    load(opts = {}) {
        return Object.assign(this, opts)
    }

    inReplyTo(messageId) {
        this.reply_to_message_id = messageId
        return this
    }

    notifications(value = true) {
        this.disable_notification = !value
        return this
    }

    webPreview(value = true) {
        this.disable_web_page_preview = !value
        return this
    }

    markup(markup) {
        if (typeof markup === 'function') {
            markup = markup(new Markup())
        }
        this.reply_markup = { ...markup }
        return this
    }

    HTML(value = true) {
        this.parse_mode = value ? 'HTML' : undefined
        return this
    }

    markdown(value = true) {
        this.parse_mode = value ? 'Markdown' : undefined
        return this
    }

    caption(caption = '') {
        this.caption = caption
        return this
    }

    static inReplyTo(messageId) {
        return new Extra().inReplyTo(messageId)
    }

    static notifications(value) {
        return new Extra().notifications(value)
    }

    static webPreview(value) {
        return new Extra().webPreview(value)
    }

    static load(opts) {
        return new Extra(opts)
    }

    static markup(markup) {
        return new Extra().markup(markup)
    }

    static HTML(value) {
        return new Extra().HTML(value)
    }

    static markdown(value) {
        return new Extra().markdown(value)
    }

    static caption(caption) {
        return new Extra().caption(caption)
    }
}

var markup = Markup;
var extra = Extra;

// --

/* let kb = new Markup().inlineKeyboard( [
    markup.callbackButton('1', 'me_1'), markup.callbackButton('2', 'me_1'),
    markup.callbackButton('3', 'me_1', true), markup.callbackButton('4', 'me_1'),
    markup.callbackButton('5', 'me_1'), markup.callbackButton('6', 'me_1'),
], { columns: 2} );

console.log(JSON.stringify(kb, null, 2)); */