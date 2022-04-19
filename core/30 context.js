/*
 * susun di sini 
 * method yang akan disertaan pada ctx
 * 
 * tambahan replyIt{markup} shortcut atas respon biasa
*/

class Context {
    constructor(update, tg) {
        this.update = update;
        this.tg = tg;
        this.state = {};
    }
    get updateType() {
        const types = Object.keys(this.update).filter((k) => typeof this.update[k] === 'object');
        if (types.length !== 1) {
            throw new Error(`Cannot determine \`updateType\` of ${JSON.stringify(this.update)}`);
        }
        return types[0];
    }
    get telegram() {
        return this.tg;
    }
    get message() {
        return this.update.message;
    }
    get editedMessage() {
        return this.update.edited_message;
    }
    get inlineQuery() {
        return this.update.inline_query;
    }
    get shippingQuery() {
        return this.update.shipping_query;
    }
    get preCheckoutQuery() {
        return this.update.pre_checkout_query;
    }
    get chosenInlineResult() {
        return this.update.chosen_inline_result;
    }
    get channelPost() {
        return this.update.channel_post;
    }
    get editedChannelPost() {
        return this.update.edited_channel_post;
    }
    get callbackQuery() {
        return this.update.callback_query;
    }
    get poll() {
        return this.update.poll;
    }
    get pollAnswer() {
        return this.update.poll_answer;
    }
    get myChatMember() {
        return this.update.my_chat_member;
    }
    get chatMember() {
        return this.update.chat_member;
    }
    get chat() {
        return (
            this.chatMember ??
            this.myChatMember ??
            getMessageFromAnySource(this)
        )?.chat;
    }
    get senderChat() {
        return getMessageFromAnySource(this)?.sender_chat;
    }

    get chatJoinRequest() {
        return this.update.chat_join_request
    }

    get from() {
        return (
            this.callbackQuery ??
            this.inlineQuery ??
            this.shippingQuery ??
            this.preCheckoutQuery ??
            this.chosenInlineResult ??
            this.chatMember ??
            this.myChatMember ??
            this.chatJoinRequest ??
            getMessageFromAnySource(this)
        )?.from;
    }
    get inlineMessageId() {
        return (this.callbackQuery ?? this.chosenInlineResult)?.inline_message_id
    }

    get passportData() {
        if (this.message == null) return undefined
        if (!('passport_data' in this.message)) return undefined
        return this.message?.passport_data
    }

    assert(value, method) {
        if (value === undefined) {
            throw new TypeError(`GASLibv3: "${method}" isn't available for "${this.updateType}"`);
        }
    }
    /**
     * @see https://core.telegram.org/bots/api#answerinlinequery
     */
    answerInlineQuery(...args) {
        this.assert(this.inlineQuery, 'answerInlineQuery');
        return this.telegram.answerInlineQuery(this.inlineQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    answerCbQuery(...args) {
        this.assert(this.callbackQuery, 'answerCbQuery');
        return this.telegram.answerCbQuery(this.callbackQuery.id, ...args);
    }
    answerCallbackQuery(...args) {
        return this.answerCbQuery(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    answerGameQuery(...args) {
        this.assert(this.callbackQuery, 'answerGameQuery');
        return this.telegram.answerGameQuery(this.callbackQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answershippingquery
     */
    answerShippingQuery(...args) {
        this.assert(this.shippingQuery, 'answerShippingQuery');
        return this.telegram.answerShippingQuery(this.shippingQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answerprecheckoutquery
     */
    answerPreCheckoutQuery(...args) {
        this.assert(this.preCheckoutQuery, 'answerPreCheckoutQuery');
        return this.telegram.answerPreCheckoutQuery(this.preCheckoutQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagetext
     */
    editMessageText(text, extra) {
        this.assert(this.callbackQuery ?? this.inlineMessageId, 'editMessageText')
        return this.telegram.editMessageText(
            this.chat?.id,
            this.callbackQuery?.message?.message_id,
            this.inlineMessageId,
            text,
            extra
        )
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagecaption
     */
    editMessageCaption(caption, extra) {
        this.assert(
            this.callbackQuery ?? this.inlineMessageId,
            'editMessageCaption'
        )
        return this.telegram.editMessageCaption(
            this.chat?.id,
            this.callbackQuery?.message?.message_id,
            this.inlineMessageId,
            caption,
            extra
        )
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagemedia
     */
    editMessageMedia(media, extra) {
        this.assert(this.callbackQuery ?? this.inlineMessageId, 'editMessageMedia')
        return this.telegram.editMessageMedia(
            this.chat?.id,
            this.callbackQuery?.message?.message_id,
            this.inlineMessageId,
            media,
            extra
        )
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagereplymarkup
     */
    editMessageReplyMarkup(markup) {
        this.assert(
            this.callbackQuery ?? this.inlineMessageId,
            'editMessageReplyMarkup'
        )
        return this.telegram.editMessageReplyMarkup(
            this.chat?.id,
            this.callbackQuery?.message?.message_id,
            this.inlineMessageId,
            markup
        )
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagelivelocation
     */
    editMessageLiveLocation(latitude, longitude, extra) {
        this.assert(
            this.callbackQuery ?? this.inlineMessageId,
            'editMessageLiveLocation'
        )
        return this.telegram.editMessageLiveLocation(
            this.chat?.id,
            this.callbackQuery?.message?.message_id,
            this.inlineMessageId,
            latitude,
            longitude,
            extra
        )
    }
    /**
     * @see https://core.telegram.org/bots/api#stopmessagelivelocation
     */
    stopMessageLiveLocation(markup) {
        this.assert(
            this.callbackQuery ?? this.inlineMessageId,
            'stopMessageLiveLocation'
        )
        return this.telegram.stopMessageLiveLocation(
            this.chat?.id,
            this.callbackQuery?.message?.message_id,
            this.inlineMessageId,
            markup
        )
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    reply(...args) {
        this.assert(this.chat, 'reply');
        return this.telegram.sendMessage(this.chat.id, ...args);
    }
    /**
    * @see https://core.telegram.org/bots/api#sendmessage
    */
    replyIt(text, extra) {
        return this.reply(text, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#getchat
     */
    getChat(...args) {
        this.assert(this.chat, 'getChat');
        return this.telegram.getChat(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#exportchatinvitelink
     */
    exportChatInviteLink(...args) {
        this.assert(this.chat, 'exportChatInviteLink');
        return this.telegram.exportChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#createchatinvitelink
     */
    createChatInviteLink(...args) {
        this.assert(this.chat, 'createChatInviteLink');
        return this.telegram.createChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#editchatinvitelink
     */
    editChatInviteLink(...args) {
        this.assert(this.chat, 'editChatInviteLink');
        return this.telegram.editChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#revokechatinvitelink
     */
    revokeChatInviteLink(...args) {
        this.assert(this.chat, 'revokeChatInviteLink');
        return this.telegram.revokeChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#banchatmember
     */
    /* kickChatMember(...args) {
        this.assert(this.chat, 'kickChatMember');
        return this.telegram.kickChatMember(this.chat.id, ...args);
    } */
    /**
     * @see https://core.telegram.org/bots/api#unbanchatmember
     */
    unbanChatMember(...args) {
        this.assert(this.chat, 'unbanChatMember');
        return this.telegram.unbanChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#restrictchatmember
     */
    restrictChatMember(...args) {
        this.assert(this.chat, 'restrictChatMember');
        return this.telegram.restrictChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#promotechatmember
     */
    promoteChatMember(...args) {
        this.assert(this.chat, 'promoteChatMember');
        return this.telegram.promoteChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
     */
    setChatAdministratorCustomTitle(...args) {
        this.assert(this.chat, 'setChatAdministratorCustomTitle');
        return this.telegram.setChatAdministratorCustomTitle(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatphoto
     */
    setChatPhoto(...args) {
        this.assert(this.chat, 'setChatPhoto');
        return this.telegram.setChatPhoto(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#deletechatphoto
     */
    deleteChatPhoto(...args) {
        this.assert(this.chat, 'deleteChatPhoto');
        return this.telegram.deleteChatPhoto(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchattitle
     */
    setChatTitle(...args) {
        this.assert(this.chat, 'setChatTitle');
        return this.telegram.setChatTitle(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatdescription
     */
    setChatDescription(...args) {
        this.assert(this.chat, 'setChatDescription');
        return this.telegram.setChatDescription(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#pinchatmessage
     */
    pinChatMessage(...args) {
        this.assert(this.chat, 'pinChatMessage');
        return this.telegram.pinChatMessage(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#unpinchatmessage
     */
    unpinChatMessage(...args) {
        this.assert(this.chat, 'unpinChatMessage');
        return this.telegram.unpinChatMessage(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#unpinallchatmessages
     */
    unpinAllChatMessages(...args) {
        this.assert(this.chat, 'unpinAllChatMessages');
        return this.telegram.unpinAllChatMessages(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#leavechat
     */
    leaveChat(...args) {
        this.assert(this.chat, 'leaveChat');
        return this.telegram.leaveChat(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatpermissions
     */
    setChatPermissions(...args) {
        this.assert(this.chat, 'setChatPermissions');
        return this.telegram.setChatPermissions(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatadministrators
     */
    getChatAdministrators(...args) {
        this.assert(this.chat, 'getChatAdministrators');
        return this.telegram.getChatAdministrators(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatmember
     */
    getChatMember(...args) {
        this.assert(this.chat, 'getChatMember');
        return this.telegram.getChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatmembercount
     */
    getChatMembersCount(...args) {
        this.assert(this.chat, 'getChatMembersCount');
        return this.telegram.getChatMembersCount(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setpassportdataerrors
     */
    setPassportDataErrors(errors) {
        this.assert(this.from, 'setPassportDataErrors');
        return this.telegram.setPassportDataErrors(this.from.id, errors);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithphoto
     */
    replyWithPhoto(...args) {
        this.assert(this.chat, 'replyWithPhoto');
        return this.telegram.sendPhoto(this.chat.id, ...args);
    }
    replyItWithPhoto(photo, extra) {
        return this.replyWithPhoto(photo, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithmediagroup
     */
    replyWithMediaGroup(...args) {
        this.assert(this.chat, 'replyWithMediaGroup');
        return this.telegram.sendMediaGroup(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithaudio
     */
    replyWithAudio(...args) {
        this.assert(this.chat, 'replyWithAudio');
        return this.telegram.sendAudio(this.chat.id, ...args);
    }

    replyItWithAudio(audio, extra) {
        return this.replyWithAudio(audio, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithdice
     */
    replyWithDice(...args) {
        this.assert(this.chat, 'replyWithDice');
        return this.telegram.sendDice(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithdocument
     */
    replyWithDocument(...args) {
        this.assert(this.chat, 'replyWithDocument');
        return this.telegram.sendDocument(this.chat.id, ...args);
    }
    replyItWithDocument(doc, extra) {
        this.replyWithDocument(doc, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithsticker
     */
    replyWithSticker(...args) {
        this.assert(this.chat, 'replyWithSticker');
        return this.telegram.sendSticker(this.chat.id, ...args);
    }
    replyItWithSticker(sticker, extra) {
        return this.replyWithSticker(sticker, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithvideo
     */
    replyWithVideo(...args) {
        this.assert(this.chat, 'replyWithVideo');
        return this.telegram.sendVideo(this.chat.id, ...args);
    }
    replyItWithVideo(video, extra) {
        return this.replyWithVideo(video, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithanimation
     */
    replyWithAnimation(...args) {
        this.assert(this.chat, 'replyWithAnimation');
        return this.telegram.sendAnimation(this.chat.id, ...args);
    }
    replyItWithAnimation(animation, extra) {
        return this.replyWithAnimation(animation, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithvideonote
     */
    replyWithVideoNote(...args) {
        this.assert(this.chat, 'replyWithVideoNote');
        return this.telegram.sendVideoNote(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithinvoice
     */
    replyWithInvoice(...args) {
        this.assert(this.chat, 'replyWithInvoice');
        return this.telegram.sendInvoice(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithgame
     */
    replyWithGame(...args) {
        this.assert(this.chat, 'replyWithGame');
        return this.telegram.sendGame(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithvoice
     */
    replyWithVoice(...args) {
        this.assert(this.chat, 'replyWithVoice');
        return this.telegram.sendVoice(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithpoll
     */
    replyWithPoll(...args) {
        this.assert(this.chat, 'replyWithPoll');
        return this.telegram.sendPoll(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithquiz
     */
    replyWithQuiz(...args) {
        this.assert(this.chat, 'replyWithQuiz');
        return this.telegram.sendQuiz(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#stoppoll
     */
    stopPoll(...args) {
        this.assert(this.chat, 'stopPoll');
        return this.telegram.stopPoll(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithchataction
     */
    replyWithChatAction(...args) {
        this.assert(this.chat, 'replyWithChatAction');
        return this.telegram.sendChatAction(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithlocation
     */
    replyWithLocation(...args) {
        this.assert(this.chat, 'replyWithLocation');
        return this.telegram.sendLocation(this.chat.id, ...args);
    }

    replyItWithLocation(latitude, longitude, extra) {
        return this.replyWithLocation(latitude, longitude, { reply_to_message_id: this.message.message_id, ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithvenue
     */
    replyWithVenue(...args) {
        this.assert(this.chat, 'replyWithVenue');
        return this.telegram.sendVenue(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#replywithcontact
     */
    replyWithContact(...args) {
        this.assert(this.chat, 'replyWithContact');
        return this.telegram.sendContact(this.chat.id, ...args);
    }
    /**
     * @deprecated use {@link Telegram.getStickerSet}
     * @see https://core.telegram.org/bots/api#getstickerset
     */
    getStickerSet(setName) {
        return this.telegram.getStickerSet(setName);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatstickerset
     */
    setChatStickerSet(setName) {
        this.assert(this.chat, 'setChatStickerSet');
        return this.telegram.setChatStickerSet(this.chat.id, setName);
    }
    /**
     * @see https://core.telegram.org/bots/api#deletechatstickerset
     */
    deleteChatStickerSet() {
        this.assert(this.chat, 'deleteChatStickerSet');
        return this.telegram.deleteChatStickerSet(this.chat.id);
    }
    /**
     * @deprecated use {@link Telegram.setStickerPositionInSet}
     * @see https://core.telegram.org/bots/api#setstickerpositioninset
     */
    setStickerPositionInSet(sticker, position) {
        return this.telegram.setStickerPositionInSet(sticker, position);
    }
    /**
     * @deprecated use {@link Telegram.setStickerSetThumb}
     * @see https://core.telegram.org/bots/api#setstickersetthumb
     */
    setStickerSetThumb(...args) {
        return this.telegram.setStickerSetThumb(...args);
    }
    /**
     * @deprecated use {@link Telegram.deleteStickerFromSet}
     * @see https://core.telegram.org/bots/api#deletestickerfromset
     */
    deleteStickerFromSet(sticker) {
        return this.telegram.deleteStickerFromSet(sticker);
    }
    /**
     * @see https://core.telegram.org/bots/api#uploadstickerfile
     */
    uploadStickerFile(...args) {
        this.assert(this.from, 'uploadStickerFile');
        return this.telegram.uploadStickerFile(this.from.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#createnewstickerset
     */
    createNewStickerSet(...args) {
        this.assert(this.from, 'createNewStickerSet');
        return this.telegram.createNewStickerSet(this.from.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#addstickertoset
     */
    addStickerToSet(...args) {
        this.assert(this.from, 'addStickerToSet');
        return this.telegram.addStickerToSet(this.from.id, ...args);
    }
    /**
     * @deprecated use {@link Telegram.getMyCommands}
     * @see https://core.telegram.org/bots/api#getmycommands
     */
    getMyCommands() {
        return this.telegram.getMyCommands();
    }
    /**
     * @deprecated use {@link Telegram.setMyCommands}
     * @see https://core.telegram.org/bots/api#setmycommands
     */
    setMyCommands(commands) {
        return this.telegram.setMyCommands(commands);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdown(markdown, extra) {
        return this.reply(markdown, { parse_mode: 'Markdown', ...extra });
    }
    replyItWithMarkdown(markdown, extra) {
        return this.replyIt(markdown, { parse_mode: 'Markdown', ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdownV2(markdown, extra) {
        return this.reply(markdown, { parse_mode: 'MarkdownV2', ...extra });
    }
    replyItWithMarkdownV2(markdown, extra) {
        return this.replyIt(markdown, { parse_mode: 'MarkdownV2', ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithHTML(html, extra) {
        return this.reply(html, { parse_mode: 'HTML', ...extra });
    }
    replyItWithHTML(text, extra) {
        return this.replyIt(text, { parse_mode: 'HTML', ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#deletemessage
     */
    deleteMessage(messageId) {
        this.assert(this.chat, 'deleteMessage');
        if (typeof messageId !== 'undefined') {
            return this.telegram.deleteMessage(this.chat.id, messageId);
        }
        const message = getMessageFromAnySource(this);
        this.assert(message, 'deleteMessage');
        return this.telegram.deleteMessage(this.chat.id, message.message_id);
    }
    /**
     * @see https://core.telegram.org/bots/api#forwardmessage
     */
    forwardMessage(chatId, extra) {
        const message = getMessageFromAnySource(this);
        this.assert(message, 'forwardMessage');
        return this.telegram.forwardMessage(chatId, message.chat.id, message.message_id, extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#copymessage
     */
    copyMessage(chatId, extra) {
        const message = getMessageFromAnySource(this);
        this.assert(message, 'copyMessage');
        return this.telegram.copyMessage(chatId, message.chat.id, message.message_id, extra);
    }

    /**
      * @see https://core.telegram.org/bots/api#approvechatjoinrequest
     */
    approveChatJoinRequest(...args) {
        this.assert(this.chat, 'approveChatJoinRequest');
        return this.telegram.approveChatJoinRequest(message.chat.id, ...args);
    }

    /**
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   */
    declineChatJoinRequest(...args) {
        this.assert(this.chat, 'declineChatJoinRequest');
        return this.telegram.declineChatJoinRequest(message.chat.id, ...args);
    }

    /**
     * @see https://core.telegram.org/bots/api#banchatsenderchat
     */
    banChatSenderChat(...args) {
        this.assert(this.chat, 'banChatSenderChat')
        return this.telegram.banChatSenderChat(this.chat.id, ...args);
    }

    /**
     * @see https://core.telegram.org/bots/api#unbanchatsenderchat
     */
    unbanChatSenderChat(...args) {
        this.assert(this.chat, 'unbanChatSenderChat')
        return this.telegram.unbanChatSenderChat(this.chat.id, ...args);
    }

}

function getMessageFromAnySource(ctx) {
    return (
        ctx.message ??
        ctx.editedMessage ??
        ctx.callbackQuery?.message ??
        ctx.channelPost ??
        ctx.editedChannelPost
    )
}
