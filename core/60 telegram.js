/*
  Class untuk method berhubungan dengan telegram client

    - penambahan method answerCallbackQuery, karena dibuat aliasnya
    - metode konstruktor disederhanakan
*/

class Telegram extends Client {
    constructor(token) {
        super();
        this.token = token;
    }

    /**
     * Get basic information about the bot
     */
    getMe() {
        return this.callApi('getMe', {});
    }
    /**
     * Get basic info about a file and prepare it for downloading
     * @param fileId Id of file to get link to
     */
    getFile(fileId) {
        return this.callApi('getFile', { file_id: fileId });
    }
    /**
     * Get download link to a file
     */
    getFileLink(fileId) {
        return Promise.resolve(fileId)
            .then((fileId) => {
                if (fileId && fileId.file_path) {
                    return fileId
                }
                const id = fileId && fileId.file_id ? fileId.file_id : fileId
                return this.getFile(id)
            })
            .then((file) => `${this.options.apiRoot}/file/bot${this.token}/${file.file_path}`)
    }
    /**
     * Directly request incoming updates.
     * You should probably use `Telegraf::launch` instead.
     */
    getUpdates(timeout, limit, offset, allowedUpdates) {
        return this.callApi('getUpdates', {
            allowed_updates: allowedUpdates,
            limit,
            offset,
            timeout,
        });
    }
    getWebhookInfo() {
        return this.callApi('getWebhookInfo', {});
    }
    getGameHighScores(userId, inlineMessageId, chatId, messageId) {
        return this.callApi('getGameHighScores', {
            user_id: userId,
            inline_message_id: inlineMessageId,
            chat_id: chatId,
            message_id: messageId,
        });
    }
    setGameScore(userId, score, inlineMessageId, chatId, messageId, editMessage = true, force = false) {
        return this.callApi('setGameScore', {
            force,
            score,
            user_id: userId,
            inline_message_id: inlineMessageId,
            chat_id: chatId,
            message_id: messageId,
            disable_edit_message: !editMessage,
        });
    }
    /**
     * Specify a url to receive incoming updates via an outgoing webhook
     * @param url HTTPS url to send updates to. Use an empty string to remove webhook integration
     */
    setWebhook(url, extra) {
        return this.callApi('setWebhook', {
            url,
            ...extra,
        });
    }
    /**
     * Remove webhook integration
     */
    deleteWebhook(extra) {
        return this.callApi('deleteWebhook', {
            ...extra,
        });
    }
    /**
     * Send a text message
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param text Text of the message to be sent
     */
    sendMessage(chatId, text, extra) {
        return this.callApi('sendMessage', { chat_id: chatId, text, ...extra });
    }
    /**
     * Forward existing message.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param fromChatId Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
     * @param messageId Message identifier in the chat specified in from_chat_id
     */
    forwardMessage(chatId, fromChatId, messageId, extra) {
        return this.callApi('forwardMessage', {
            chat_id: chatId,
            from_chat_id: fromChatId,
            message_id: messageId,
            ...extra,
        });
    }
    /**
     * Use this method when you need to tell the user that something is happening on the bot's side.
     * The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendChatAction(chatId, action) {
        return this.callApi('sendChatAction', { chat_id: chatId, action });
    }
    getUserProfilePhotos(userId, offset, limit) {
        return this.callApi('getUserProfilePhotos', {
            user_id: userId,
            offset,
            limit,
        });
    }
    /**
     * Send point on the map
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendLocation(chatId, latitude, longitude, extra) {
        return this.callApi('sendLocation', {
            chat_id: chatId,
            latitude,
            longitude,
            ...extra,
        });
    }
    sendVenue(chatId, latitude, longitude, title, address, extra) {
        return this.callApi('sendVenue', {
            latitude,
            longitude,
            title,
            address,
            chat_id: chatId,
            ...extra,
        });
    }
    /**
     * @param chatId Unique identifier for the target private chat
     */
    sendInvoice(chatId, invoice, extra) {
        return this.callApi('sendInvoice', {
            chat_id: chatId,
            ...invoice,
            ...extra,
        });
    }
    sendContact(chatId, phoneNumber, firstName, extra) {
        return this.callApi('sendContact', {
            chat_id: chatId,
            phone_number: phoneNumber,
            first_name: firstName,
            ...extra,
        });
    }
    /**
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendPhoto(chatId, photo, extra) {
        return this.callApi('sendPhoto', { chat_id: chatId, photo, ...extra });
    }
    /**
     * Send a dice, which will have a random value from 1 to 6.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendDice(chatId, extra) {
        return this.callApi('sendDice', { chat_id: chatId, ...extra });
    }
    /**
     * Send general files. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendDocument(chatId, document, extra) {
        return this.callApi('sendDocument', { chat_id: chatId, document, ...extra });
    }
    /**
     * Send audio files, if you want Telegram clients to display them in the music player.
     * Your audio must be in the .mp3 format.
     * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendAudio(chatId, audio, extra) {
        return this.callApi('sendAudio', { chat_id: chatId, audio, ...extra });
    }
    /**
     * Send .webp stickers
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendSticker(chatId, sticker, extra) {
        return this.callApi('sendSticker', { chat_id: chatId, sticker, ...extra });
    }
    /**
     * Send video files, Telegram clients support mp4 videos (other formats may be sent as Document)
     * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendVideo(chatId, video, extra) {
        return this.callApi('sendVideo', { chat_id: chatId, video, ...extra });
    }
    /**
     * Send .gif animations
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendAnimation(chatId, animation, extra) {
        return this.callApi('sendAnimation', {
            chat_id: chatId,
            animation,
            ...extra,
        });
    }
    /**
     * Send video messages
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendVideoNote(chatId, videoNote, extra) {
        return this.callApi('sendVideoNote', {
            chat_id: chatId,
            video_note: videoNote,
            ...extra,
        });
    }
    /**
     * Send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendVoice(chatId, voice, extra) {
        return this.callApi('sendVoice', { chat_id: chatId, voice, ...extra });
    }
    /**
     * @param chatId Unique identifier for the target chat
     * @param gameShortName Short name of the game, serves as the unique identifier for the game. Set up your games via Botfather.
     */
    sendGame(chatId, gameName, extra) {
        return this.callApi('sendGame', {
            chat_id: chatId,
            game_short_name: gameName,
            ...extra,
        });
    }
    /**
     * Send a group of photos or videos as an album
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param media A JSON-serialized array describing photos and videos to be sent, must include 2–10 items
     */
    sendMediaGroup(chatId, media, extra) {
        return this.callApi('sendMediaGroup', { chat_id: chatId, media, ...extra });
    }
    /**
     * Send a native poll.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param question Poll question, 1-255 characters
     * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
     */
    sendPoll(chatId, question, options, extra) {
        return this.callApi('sendPoll', {
            chat_id: chatId,
            type: 'regular',
            question,
            options,
            ...extra,
        });
    }
    /**
     * Send a native quiz.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param question Poll question, 1-255 characters
     * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
     */
    sendQuiz(chatId, question, options, extra) {
        return this.callApi('sendPoll', {
            chat_id: chatId,
            type: 'quiz',
            question,
            options,
            ...extra,
        });
    }
    /**
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Identifier of the original message with the poll
     */
    stopPoll(chatId, messageId, extra) {
        return this.callApi('stopPoll', {
            chat_id: chatId,
            message_id: messageId,
            ...extra,
        });
    }
    /**
     * Get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.)
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    getChat(chatId) {
        return this.callApi('getChat', { chat_id: chatId });
    }
    /**
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    getChatAdministrators(chatId) {
        return this.callApi('getChatAdministrators', { chat_id: chatId });
    }
    /**
     * Get information about a member of a chat.
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     * @param userId Unique identifier of the target user
     */
    getChatMember(chatId, userId) {
        return this.callApi('getChatMember', { chat_id: chatId, user_id: userId });
    }
    /**
     * Get the number of members in a chat
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    getChatMembersCount(chatId) {
        return this.callApi('getChatMembersCount', { chat_id: chatId });
    }
    /**
     * Send answers to an inline query.
     * No more than 50 results per query are allowed.
     */
    answerInlineQuery(inlineQueryId, results, extra) {
        return this.callApi('answerInlineQuery', {
            inline_query_id: inlineQueryId,
            results,
            ...extra,
        });
    }
    setChatPermissions(chatId, permissions) {
        return this.callApi('setChatPermissions', { chat_id: chatId, permissions });
    }
    /**
     * Kick a user from a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
     * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
     * @param untilDate Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever
     */
    banChatMember(chatId, userId, extra) {
        return this.callApi('banChatMember', {
            chat_id: chatId,
            user_id: userId,
            ...extra,
        });
    }
    /**
     * Promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    promoteChatMember(chatId, userId, extra) {
        return this.callApi('promoteChatMember', {
            chat_id: chatId,
            user_id: userId,
            ...extra,
        });
    }
    /**
     * Restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all boolean parameters to lift restrictions from a user.
     * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     */
    restrictChatMember(chatId, userId, extra) {
        return this.callApi('restrictChatMember', {
            chat_id: chatId,
            user_id: userId,
            ...extra,
        });
    }
    setChatAdministratorCustomTitle(chatId, userId, title) {
        return this.callApi('setChatAdministratorCustomTitle', {
            chat_id: chatId,
            user_id: userId,
            custom_title: title,
        });
    }
    /**
     * Export an invite link to a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    exportChatInviteLink(chatId) {
        return this.callApi('exportChatInviteLink', { chat_id: chatId });
    }
    createChatInviteLink(chatId, extra) {
        return this.callApi('createChatInviteLink', {
            chat_id: chatId,
            ...extra,
        });
    }
    editChatInviteLink(chatId, inviteLink, extra) {
        return this.callApi('editChatInviteLink', {
            chat_id: chatId,
            invite_link: inviteLink,
            ...extra,
        });
    }
    revokeChatInviteLink(chatId, inviteLink) {
        return this.callApi('revokeChatInviteLink', {
            chat_id: chatId,
            invite_link: inviteLink,
        });
    }
    setChatPhoto(chatId, photo) {
        return this.callApi('setChatPhoto', { chat_id: chatId, photo });
    }
    deleteChatPhoto(chatId) {
        return this.callApi('deleteChatPhoto', { chat_id: chatId });
    }
    /**
     * Change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
     * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
     * @param title New chat title, 1-255 characters
     */
    setChatTitle(chatId, title) {
        return this.callApi('setChatTitle', { chat_id: chatId, title });
    }
    setChatDescription(chatId, description) {
        return this.callApi('setChatDescription', { chat_id: chatId, description });
    }
    /**
     * Pin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel.
     * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     */
    pinChatMessage(chatId, messageId, extra) {
        return this.callApi('pinChatMessage', {
            chat_id: chatId,
            message_id: messageId,
            ...extra,
        });
    }
    /**
     * Unpin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    unpinChatMessage(chatId, messageId) {
        return this.callApi('unpinChatMessage', {
            chat_id: chatId,
            message_id: messageId,
        });
    }
    /**
     * Clear the list of pinned messages in a chat
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    unpinAllChatMessages(chatId) {
        return this.callApi('unpinAllChatMessages', { chat_id: chatId });
    }
    /**
     * Use this method for your bot to leave a group, supergroup or channel
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    leaveChat(chatId) {
        return this.callApi('leaveChat', { chat_id: chatId });
    }
    /**
     * Unban a user from a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
     * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format @username)
     * @param userId Unique identifier of the target user
     */
    unbanChatMember(chatId, userId, extra) {
        return this.callApi('unbanChatMember', {
            chat_id: chatId,
            user_id: userId,
            ...extra,
        });
    }
    answerCbQuery(callbackQueryId, text, extra) {
        return this.callApi('answerCallbackQuery', {
            text,
            callback_query_id: callbackQueryId,
            ...extra,
        });
    }
    answerCallbackQuery(...args) {
        return this.answerCbQuery(...args);
    }
    answerGameQuery(callbackQueryId, url) {
        return this.callApi('answerCallbackQuery', {
            url,
            callback_query_id: callbackQueryId,
        });
    }
    /**
     * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified,
     * the Bot API will send an Update with a shipping_query field to the bot.
     * Reply to shipping queries.
     * @param ok  Specify True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
     * @param shippingOptions Required if ok is True. A JSON-serialized array of available shipping options.
     * @param errorMessage Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user.
     */
    answerShippingQuery(shippingQueryId, ok, shippingOptions, errorMessage) {
        return this.callApi('answerShippingQuery', {
            ok,
            shipping_query_id: shippingQueryId,
            shipping_options: shippingOptions,
            error_message: errorMessage,
        });
    }
    /**
     * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query.
     * Respond to such pre-checkout queries. On success, True is returned.
     * Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
     * @param ok  Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
     * @param errorMessage Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user.
     */
    answerPreCheckoutQuery(preCheckoutQueryId, ok, errorMessage) {
        return this.callApi('answerPreCheckoutQuery', {
            ok,
            pre_checkout_query_id: preCheckoutQueryId,
            error_message: errorMessage,
        });
    }
    /**
     * Edit text and game messages sent by the bot or via the bot (for inline bots).
     * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param text New text of the message
     */
    editMessageText(chatId, messageId, inlineMessageId, text, extra) {
        return this.callApi('editMessageText', {
            text,
            chat_id: chatId,
            message_id: messageId,
            inline_message_id: inlineMessageId,
            ...extra,
        });
    }
    /**
     * Edit captions of messages sent by the bot or via the bot (for inline bots).
     * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param caption New caption of the message
     * @param markup A JSON-serialized object for an inline keyboard.
     */
    editMessageCaption(chatId, messageId, inlineMessageId, caption, extra) {
        return this.callApi('editMessageCaption', {
            caption,
            chat_id: chatId,
            message_id: messageId,
            inline_message_id: inlineMessageId,
            ...extra,
        });
    }
    /**
     * Edit animation, audio, document, photo, or video messages.
     * If a message is a part of a message album, then it can be edited only to a photo or a video.
     * Otherwise, message type can be changed arbitrarily.
     * When inline message is edited, new file can't be uploaded.
     * Use previously uploaded file via its file_id or specify a URL.
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param media New media of message
     * @param markup Markup of inline keyboard
     */
    editMessageMedia(chatId, messageId, inlineMessageId, media, extra) {
        return this.callApi('editMessageMedia', {
            chat_id: chatId,
            message_id: messageId,
            inline_message_id: inlineMessageId,
            media,
            ...extra,
        });
    }
    /**
     * Edit only the reply markup of messages sent by the bot or via the bot (for inline bots).
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param markup A JSON-serialized object for an inline keyboard.
     * @returns If edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     */
    editMessageReplyMarkup(chatId, messageId, inlineMessageId, markup) {
        return this.callApi('editMessageReplyMarkup', {
            chat_id: chatId,
            message_id: messageId,
            inline_message_id: inlineMessageId,
            reply_markup: markup,
        });
    }
    editMessageLiveLocation(chatId, messageId, inlineMessageId, latitude, longitude, extra) {
        return this.callApi('editMessageLiveLocation', {
            latitude,
            longitude,
            chat_id: chatId,
            message_id: messageId,
            inline_message_id: inlineMessageId,
            ...extra,
        });
    }
    stopMessageLiveLocation(chatId, messageId, inlineMessageId, markup) {
        return this.callApi('stopMessageLiveLocation', {
            chat_id: chatId,
            message_id: messageId,
            inline_message_id: inlineMessageId,
            reply_markup: markup,
        });
    }
    /**
     * Delete a message, including service messages, with the following limitations:
     * - A message can only be deleted if it was sent less than 48 hours ago.
     * - Bots can delete outgoing messages in groups and supergroups.
     * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
     * - If the bot is an administrator of a group, it can delete any message there.
     * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    deleteMessage(chatId, messageId) {
        return this.callApi('deleteMessage', {
            chat_id: chatId,
            message_id: messageId,
        });
    }
    setChatStickerSet(chatId, setName) {
        return this.callApi('setChatStickerSet', {
            chat_id: chatId,
            sticker_set_name: setName,
        });
    }
    deleteChatStickerSet(chatId) {
        return this.callApi('deleteChatStickerSet', { chat_id: chatId });
    }
    getStickerSet(name) {
        return this.callApi('getStickerSet', { name });
    }
    /**
     * Upload a .png file with a sticker for later use in createNewStickerSet and addStickerToSet methods (can be used multiple times)
     * https://core.telegram.org/bots/api#sending-files
     * @param ownerId User identifier of sticker file owner
     * @param stickerFile Png image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px.
     */
    uploadStickerFile(ownerId, stickerFile) {
        return this.callApi('uploadStickerFile', {
            user_id: ownerId,
            png_sticker: stickerFile,
        });
    }
    /**
     * Create new sticker set owned by a user. The bot will be able to edit the created sticker set
     * @param ownerId User identifier of created sticker set owner
     * @param name Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only english letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in “_by_<bot username>”. <bot_username> is case insensitive. 1-64 characters.
     * @param title Sticker set title, 1-64 characters
     */
    createNewStickerSet(ownerId, name, title, stickerData) {
        return this.callApi('createNewStickerSet', {
            name,
            title,
            user_id: ownerId,
            ...stickerData,
        });
    }
    /**
     * Add a new sticker to a set created by the bot
     * @param ownerId User identifier of sticker set owner
     * @param name Sticker set name
     */
    addStickerToSet(ownerId, name, stickerData) {
        return this.callApi('addStickerToSet', {
            name,
            user_id: ownerId,
            ...stickerData,
        });
    }
    /**
     * Move a sticker in a set created by the bot to a specific position
     * @param sticker File identifier of the sticker
     * @param position New sticker position in the set, zero-based
     */
    setStickerPositionInSet(sticker, position) {
        return this.callApi('setStickerPositionInSet', {
            sticker,
            position,
        });
    }
    setStickerSetThumb(name, userId, thumb) {
        return this.callApi('setStickerSetThumb', { name, user_id: userId, thumb });
    }
    /**
     * Delete a sticker from a set created by the bot.
     * @param sticker File identifier of the sticker
     */
    deleteStickerFromSet(sticker) {
        return this.callApi('deleteStickerFromSet', { sticker });
    }
    /**
     * Get the current list of the bot's commands.
     */
    getMyCommands(extra = {}) {
        return this.callApi('getMyCommands', extra);
    }
    /**
     * Change the list of the bot's commands.
     * @param commands A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
     */
    setMyCommands(commands, extra) {
        return this.callApi('setMyCommands', { commands, ...extra });
    }
    deleteMyCommands(extra = {}) {
        return this.callApi('deleteMyCommands', extra);
    }
    setPassportDataErrors(userId, errors) {
        return this.callApi('setPassportDataErrors', {
            user_id: userId,
            errors: errors,
        });
    }
    /**
     * Send copy of existing message.
     * @deprecated use `copyMessage` instead
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param message Received message object
     */
    sendCopy(chatId, message, extra) {
        return this.copyMessage(chatId, message.chat.id, message.message_id, extra);
    }
    /**
     * Send copy of existing message
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param fromChatId Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
     * @param messageId Message identifier in the chat specified in from_chat_id
     */
    copyMessage(chatId, fromChatId, messageId, extra) {
        return this.callApi('copyMessage', {
            chat_id: chatId,
            from_chat_id: fromChatId,
            message_id: messageId,
            ...extra,
        });
    }
    /**
     * Log out from the cloud Bot API server before launching the bot locally
     */
    logOut() {
        return this.callApi('logOut', {});
    }
    /**
     * Close the bot instance before moving it from one local server to another
     */
    close() {
        return this.callApi('close', {});
    }

    // Bot API 5.4

    /**
     * 
     * Use this method to approve a chat join request. 
     * The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
     * Returns True on success.
     */
    approveChatJoinRequest(chatId, userId, extra) {
        return this.callApi('approveChatJoinRequest', {
            chat_id: chatId,
            user_id: userId,
            ...extra,
        });
    }

    /**
     * 
     * Use this method to decline a chat join request. 
     * The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. 
     * Returns True on success.
     */
    declineChatJoinRequest(chatId, userId, extra) {
        return this.callApi('declineChatJoinRequest', {
            chat_id: chatId,
            user_id: userId,
            ...extra,
        });
    }

    /**
     * Use this method to ban a channel chat in a supergroup or a channel. 
     * Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. 
     * The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. 
     * Returns True on success.
     */
    banChatSenderChat(chatId, senderChatId, extra) {
        return this.callApi('banChatSenderChat', {
            chat_id: chatId,
            sender_chat_id: senderChatId,
            ...extra,
        });
    }

    /**
     * Use this method to unban a previously banned channel chat in a supergroup or channel. 
     * The bot must be an administrator for this to work and must have the appropriate administrator rights. 
     * Returns True on success.
     */
    unbanChatSenderChat(chatId, senderChatId, extra) {
        return this.callApi('unbanChatSenderChat', {
            chat_id: chatId,
            sender_chat_id: senderChatId,
            ...extra,
        });
    }

}