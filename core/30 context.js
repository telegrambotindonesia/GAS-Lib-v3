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
    const types = Object.keys(this.update).filter(
      (k) => typeof this.update[k] === "object",
    );
    if (types.length !== 1) {
      throw new Error(
        `Cannot determine \`updateType\` of ${JSON.stringify(this.update)}`,
      );
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
  get messageReaction() {
    return this.update.message_reaction;
  }
  get messageReactionCount() {
    return this.update.message_reaction_count;
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
    return this.update.chat_join_request;
  }
  get chatBoost() {
    return this.update.chat_boost;
  }
  get removedChatBoost() {
    return this.update.removed_chat_boost;
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
    return (this.callbackQuery ?? this.chosenInlineResult)?.inline_message_id;
  }

  get passportData() {
    if (this.message == null) return undefined;
    if (!("passport_data" in this.message)) return undefined;
    return this.message?.passport_data;
  }

  assert(value, method) {
    if (value === undefined) {
      throw new TypeError(
        `GASLibv3: "${method}" isn't available for "${this.updateType}"`,
      );
    }
  }
  /**
   * @see https://core.telegram.org/bots/api#answerinlinequery
   */
  answerInlineQuery(...args) {
    this.assert(this.inlineQuery, "answerInlineQuery");
    return this.telegram.answerInlineQuery(this.inlineQuery.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#answercallbackquery
   */
  answerCbQuery(...args) {
    this.assert(this.callbackQuery, "answerCbQuery");
    return this.telegram.answerCbQuery(this.callbackQuery.id, ...args);
  }
  answerCallbackQuery(...args) {
    return this.answerCbQuery(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#answercallbackquery
   */
  answerGameQuery(...args) {
    this.assert(this.callbackQuery, "answerGameQuery");
    return this.telegram.answerGameQuery(this.callbackQuery.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#answershippingquery
   */
  answerShippingQuery(...args) {
    this.assert(this.shippingQuery, "answerShippingQuery");
    return this.telegram.answerShippingQuery(this.shippingQuery.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   */
  answerPreCheckoutQuery(...args) {
    this.assert(this.preCheckoutQuery, "answerPreCheckoutQuery");
    return this.telegram.answerPreCheckoutQuery(
      this.preCheckoutQuery.id,
      ...args,
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#editmessagetext
   */
  editMessageText(text, extra) {
    this.assert(this.callbackQuery ?? this.inlineMessageId, "editMessageText");
    return this.telegram.editMessageText(
      this.chat?.id,
      this.callbackQuery?.message?.message_id,
      this.inlineMessageId,
      text,
      extra,
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#editmessagecaption
   */
  editMessageCaption(caption, extra) {
    this.assert(
      this.callbackQuery ?? this.inlineMessageId,
      "editMessageCaption",
    );
    return this.telegram.editMessageCaption(
      this.chat?.id,
      this.callbackQuery?.message?.message_id,
      this.inlineMessageId,
      caption,
      extra,
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#editmessagemedia
   */
  editMessageMedia(media, extra) {
    this.assert(this.callbackQuery ?? this.inlineMessageId, "editMessageMedia");
    return this.telegram.editMessageMedia(
      this.chat?.id,
      this.callbackQuery?.message?.message_id,
      this.inlineMessageId,
      media,
      extra,
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#editmessagereplymarkup
   */
  editMessageReplyMarkup(markup) {
    this.assert(
      this.callbackQuery ?? this.inlineMessageId,
      "editMessageReplyMarkup",
    );
    return this.telegram.editMessageReplyMarkup(
      this.chat?.id,
      this.callbackQuery?.message?.message_id,
      this.inlineMessageId,
      markup,
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#editmessagelivelocation
   */
  editMessageLiveLocation(latitude, longitude, extra) {
    this.assert(
      this.callbackQuery ?? this.inlineMessageId,
      "editMessageLiveLocation",
    );
    return this.telegram.editMessageLiveLocation(
      this.chat?.id,
      this.callbackQuery?.message?.message_id,
      this.inlineMessageId,
      latitude,
      longitude,
      extra,
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#stopmessagelivelocation
   */
  stopMessageLiveLocation(markup) {
    this.assert(
      this.callbackQuery ?? this.inlineMessageId,
      "stopMessageLiveLocation",
    );
    return this.telegram.stopMessageLiveLocation(
      this.chat?.id,
      this.callbackQuery?.message?.message_id,
      this.inlineMessageId,
      markup,
    );
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  sendMessage(text, extra) {
    this.assert(this.chat, "sendMessage");
    return this.telegram.sendMessage(this.chat.id, text, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  reply(...args) {
    return this.sendMessage(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyIt(text, extra) {
    return this.reply(text, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#getchat
   */
  getChat(...args) {
    this.assert(this.chat, "getChat");
    return this.telegram.getChat(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#exportchatinvitelink
   */
  exportChatInviteLink(...args) {
    this.assert(this.chat, "exportChatInviteLink");
    return this.telegram.exportChatInviteLink(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#createchatinvitelink
   */
  createChatInviteLink(...args) {
    this.assert(this.chat, "createChatInviteLink");
    return this.telegram.createChatInviteLink(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#editchatinvitelink
   */
  editChatInviteLink(...args) {
    this.assert(this.chat, "editChatInviteLink");
    return this.telegram.editChatInviteLink(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#revokechatinvitelink
   */
  revokeChatInviteLink(...args) {
    this.assert(this.chat, "revokeChatInviteLink");
    return this.telegram.revokeChatInviteLink(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#banchatmember
   */
  banChatMember(...args) {
    this.assert(this.chat, "banChatMember");
    return this.telegram.kickChatMember(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#unbanchatmember
   */
  unbanChatMember(...args) {
    this.assert(this.chat, "unbanChatMember");
    return this.telegram.unbanChatMember(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#restrictchatmember
   */
  restrictChatMember(...args) {
    this.assert(this.chat, "restrictChatMember");
    return this.telegram.restrictChatMember(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#promotechatmember
   */
  promoteChatMember(...args) {
    this.assert(this.chat, "promoteChatMember");
    return this.telegram.promoteChatMember(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
   */
  setChatAdministratorCustomTitle(...args) {
    this.assert(this.chat, "setChatAdministratorCustomTitle");
    return this.telegram.setChatAdministratorCustomTitle(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#setchatphoto
   */
  setChatPhoto(...args) {
    this.assert(this.chat, "setChatPhoto");
    return this.telegram.setChatPhoto(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#deletechatphoto
   */
  deleteChatPhoto(...args) {
    this.assert(this.chat, "deleteChatPhoto");
    return this.telegram.deleteChatPhoto(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#setchattitle
   */
  setChatTitle(...args) {
    this.assert(this.chat, "setChatTitle");
    return this.telegram.setChatTitle(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#setchatdescription
   */
  setChatDescription(...args) {
    this.assert(this.chat, "setChatDescription");
    return this.telegram.setChatDescription(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#pinchatmessage
   */
  pinChatMessage(...args) {
    this.assert(this.chat, "pinChatMessage");
    return this.telegram.pinChatMessage(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#unpinchatmessage
   */
  unpinChatMessage(...args) {
    this.assert(this.chat, "unpinChatMessage");
    return this.telegram.unpinChatMessage(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#unpinallchatmessages
   */
  unpinAllChatMessages(...args) {
    this.assert(this.chat, "unpinAllChatMessages");
    return this.telegram.unpinAllChatMessages(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#leavechat
   */
  leaveChat(...args) {
    this.assert(this.chat, "leaveChat");
    return this.telegram.leaveChat(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#setchatpermissions
   */
  setChatPermissions(...args) {
    this.assert(this.chat, "setChatPermissions");
    return this.telegram.setChatPermissions(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#getchatadministrators
   */
  getChatAdministrators(...args) {
    this.assert(this.chat, "getChatAdministrators");
    return this.telegram.getChatAdministrators(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#getchatmember
   */
  getChatMember(...args) {
    this.assert(this.chat, "getChatMember");
    return this.telegram.getChatMember(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#getchatmembercount
   */
  getChatMembersCount(...args) {
    this.assert(this.chat, "getChatMembersCount");
    return this.telegram.getChatMembersCount(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#setpassportdataerrors
   */
  setPassportDataErrors(errors) {
    this.assert(this.from, "setPassportDataErrors");
    return this.telegram.setPassportDataErrors(this.from.id, errors);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendphoto
   */
  sendPhoto(photo, extra) {
    this.assert(this.chat, "sendPhoto");
    return this.telegram.sendPhoto(this.chat.id, photo, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#replywithphoto
   */
  replyWithPhoto(...args) {
    this.assert(this.chat, "replyWithPhoto");
    return this.sendPhoto(...args);
  }
  replyItWithPhoto(photo, extra) {
    return this.replyWithPhoto(photo, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendmediagroup
   */
  sendMediaGroup(media, extra) {
    this.assert(this.chat, "sendMediaGroup");
    return this.telegram.sendMediaGroup(this.chat.id, media, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#replywithmediagroup
   */
  replyWithMediaGroup(...args) {
    this.assert(this.chat, "replyWithMediaGroup");
    return this.sendMediaGroup(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendaudio
   */
  sendAudio(audio, extra) {
    this.assert(this.chat, "sendAudio");
    return this.telegram.sendAudio(this.chat.id, audio, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendaudio
   */
  replyWithAudio(...args) {
    return this.sendAudio(...args);
  }

  replyItWithAudio(audio, extra) {
    return this.replyWithAudio(audio, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#senddice
   */
  sendDice(extra) {
    this.assert(this.chat, "sendDice");
    return this.telegram.sendDice(this.chat.id, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#senddice
   */
  replyWithDice(...args) {
    return this.sendDice(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#senddocument
   */
  sendDocument(document, extra) {
    this.assert(this.chat, "sendDocument");
    return this.telegram.sendDocument(this.chat.id, document, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#senddocument
   */
  replyWithDocument(...args) {
    return this.sendDocument(...args);
  }
  replyItWithDocument(doc, extra) {
    this.replyWithDocument(doc, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendsticker
   */
  sendSticker(sticker, extra) {
    this.assert(this.chat, "sendSticker");
    return this.telegram.sendSticker(this.chat.id, sticker, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendsticker
   */
  replyWithSticker(...args) {
    return this.sendSticker(...args);
  }
  replyItWithSticker(sticker, extra) {
    return this.replyWithSticker(sticker, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvideo
   */
  sendVideo(video, extra) {
    this.assert(this.chat, "sendVideo");
    return this.telegram.sendVideo(this.chat.id, video, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvideo
   */
  replyWithVideo(...args) {
    return this.sendVideo(...args);
  }
  replyItWithVideo(video, extra) {
    return this.replyWithVideo(video, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#sendanimation
   */
  sendAnimation(animation, extra) {
    this.assert(this.chat, "sendAnimation");
    return this.telegram.sendAnimation(this.chat.id, animation, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendanimation
   */
  replyWithAnimation(...args) {
    return this.sendAnimation(...args);
  }
  replyItWithAnimation(animation, extra) {
    return this.replyWithAnimation(animation, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvideonote
   */
  sendVideoNote(videoNote, extra) {
    this.assert(this.chat, "sendVideoNote");
    return this.telegram.sendVideoNote(this.chat.id, videoNote, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvideonote
   */
  replyWithVideoNote(...args) {
    return this.sendVideoNote(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendinvoice
   */
  sendInvoice(invoice, extra) {
    this.assert(this.chat, "sendInvoice");
    return this.telegram.sendInvoice(this.chat.id, invoice, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendinvoice
   */
  replyWithInvoice(...args) {
    return this.sendInvoice(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendgame
   */
  sendGame(game, extra) {
    this.assert(this.chat, "sendGame");
    return this.telegram.sendGame(this.chat.id, game, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendgame
   */
  replyWithGame(...args) {
    return this.sendGame(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvoice
   */
  sendVoice(voice, extra) {
    this.assert(this.chat, "sendVoice");
    return this.telegram.sendVoice(this.chat.id, voice, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvoice
   */
  replyWithVoice(...args) {
    return this.sendVoice(...args);
  }

  /**
   * @see https://core.telegram.org/bots/api#sendpoll
   */
  sendPoll(poll, options, extra) {
    this.assert(this.chat, "sendPoll");
    return this.telegram.sendPoll(this.chat.id, poll, options, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendpoll
   */
  replyWithPoll(...args) {
    return this.sendPoll(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendpoll
   */
  sendQuiz(quiz, options, extra) {
    this.assert(this.chat, "sendQuiz");
    return this.telegram.sendQuiz(this.chat.id, quiz, options, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendpoll
   */
  replyWithQuiz(...args) {
    return this.sendQuiz(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#stoppoll
   */
  stopPoll(...args) {
    this.assert(this.chat, "stopPoll");
    return this.telegram.stopPoll(this.chat.id, ...args);
  }

  /**
   * @see https://core.telegram.org/bots/api#sendchataction
   */
  sendChatAction(action, extra) {
    this.assert(this.chat, "sendChatAction");
    return this.telegram.sendChatAction(this.chat.id, action, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }

  /**
   * @see https://core.telegram.org/bots/api#replywithchataction
   */
  replyWithChatAction(...args) {
    this.assert(this.chat, "replyWithChatAction");
    return this.sendChatAction(this.chat.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#replywithlocation
   */
  replyWithLocation(...args) {
    this.assert(this.chat, "replyWithLocation");
    return this.telegram.sendLocation(this.chat.id, ...args);
  }

  replyItWithLocation(latitude, longitude, extra) {
    return this.replyWithLocation(latitude, longitude, {
      reply_to_message_id: this.message.message_id,
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvenue
   */
  sendVenue(latitude, longitude, title, address, extra) {
    this.assert(this.chat, "sendVenue");
    return this.telegram.sendVenue(
      this.chat.id,
      latitude,
      longitude,
      title,
      address,
      { message_thread_id: getThreadId(this), ...extra },
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#sendvenue
   */
  replyWithVenue(...args) {
    return this.sendVenue(...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#sendcontact
   */
  sendContact(phoneNumber, firstName, extra) {
    this.assert(this.chat, "sendContact");
    return this.telegram.sendContact(this.chat.id, phoneNumber, firstName, {
      message_thread_id: getThreadId(this),
      ...extra,
    });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendcontact
   */
  replyWithContact(...args) {
    return this.sendContact(...args);
  }

  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this
   * to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a
   * ForumTopic object.
   *
   * @see https://core.telegram.org/bots/api#createforumtopic
   */
  createForumTopic(...args) {
    this.assert(this.chat, "createForumTopic");
    return this.telegram.createForumTopic(this.chat.id, ...args);
  }
  /**
   * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in
   * the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the
   * topic. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#editforumtopic
   */
  editForumTopic(extra) {
    this.assert(this.chat, "editForumTopic");
    this.assert(this.message?.message_thread_id, "editForumTopic");
    return this.telegram.editForumTopic(
      this.chat.id,
      this.message.message_thread_id,
      extra,
    );
  }
  /**
   * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat
   * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#closeforumtopic
   */
  closeForumTopic() {
    this.assert(this.chat, "closeForumTopic");
    this.assert(this.message?.message_thread_id, "closeForumTopic");
    return this.telegram.closeForumTopic(
      this.chat.id,
      this.message.message_thread_id,
    );
  }
  /**
   * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat
   * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#reopenforumtopic
   */
  reopenForumTopic() {
    this.assert(this.chat, "reopenForumTopic");
    this.assert(this.message?.message_thread_id, "reopenForumTopic");
    return this.telegram.reopenForumTopic(
      this.chat.id,
      this.message.message_thread_id,
    );
  }
  /**
   * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an
   * administrator in the chat for this to work and must have the can_delete_messages administrator rights.
   * Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#deleteforumtopic
   */
  deleteForumTopic() {
    this.assert(this.chat, "deleteForumTopic");
    this.assert(this.message?.message_thread_id, "deleteForumTopic");
    return this.telegram.deleteForumTopic(
      this.chat.id,
      this.message.message_thread_id,
    );
  }
  /**
   * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat
   * for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
   */
  unpinAllForumTopicMessages() {
    this.assert(this.chat, "unpinAllForumTopicMessages");
    this.assert(this.message?.message_thread_id, "unpinAllForumTopicMessages");
    return this.telegram.unpinAllForumTopicMessages(
      this.chat.id,
      this.message.message_thread_id,
    );
  }
  /**
   * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator
   * in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#editgeneralforumtopic
   */
  editGeneralForumTopic(name) {
    this.assert(this.chat, "editGeneralForumTopic");
    return this.telegram.editGeneralForumTopic(this.chat.id, name);
  }
  /**
   * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the
   * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#closegeneralforumtopic
   */
  closeGeneralForumTopic() {
    this.assert(this.chat, "closeGeneralForumTopic");
    return this.telegram.closeGeneralForumTopic(this.chat.id);
  }
  /**
   * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in
   * the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically
   * unhidden if it was hidden. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
   */
  reopenGeneralForumTopic() {
    this.assert(this.chat, "reopenGeneralForumTopic");
    return this.telegram.reopenGeneralForumTopic(this.chat.id);
  }
  /**
   * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat
   * for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed
   * if it was open. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
   */
  hideGeneralForumTopic() {
    this.assert(this.chat, "hideGeneralForumTopic");
    return this.telegram.hideGeneralForumTopic(this.chat.id);
  }
  /**
   * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the
   * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
   */
  unhideGeneralForumTopic() {
    this.assert(this.chat, "unhideGeneralForumTopic");
    return this.telegram.unhideGeneralForumTopic(this.chat.id);
  }
  /**
   * Use this method to clear the list of pinned messages in a General forum topic.
   * The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator
   * right in the supergroup.
   *
   * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   *
   * @see https://core.telegram.org/bots/api#unpinallgeneralforumtopicmessages
   */
  unpinAllGeneralForumTopicMessages() {
    this.assert(this.chat, "unpinAllGeneralForumTopicMessages");
    return this.telegram.unpinAllGeneralForumTopicMessages(this.chat.id);
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
    this.assert(this.chat, "setChatStickerSet");
    return this.telegram.setChatStickerSet(this.chat.id, setName);
  }
  /**
   * @see https://core.telegram.org/bots/api#deletechatstickerset
   */
  deleteChatStickerSet() {
    this.assert(this.chat, "deleteChatStickerSet");
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
    this.assert(this.from, "uploadStickerFile");
    return this.telegram.uploadStickerFile(this.from.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#createnewstickerset
   */
  createNewStickerSet(...args) {
    this.assert(this.from, "createNewStickerSet");
    return this.telegram.createNewStickerSet(this.from.id, ...args);
  }
  /**
   * @see https://core.telegram.org/bots/api#addstickertoset
   */
  addStickerToSet(...args) {
    this.assert(this.from, "addStickerToSet");
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
    return this.reply(markdown, { parse_mode: "Markdown", ...extra });
  }
  replyItWithMarkdown(markdown, extra) {
    return this.replyIt(markdown, { parse_mode: "Markdown", ...extra });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithMarkdownV2(markdown, extra) {
    return this.reply(markdown, { parse_mode: "MarkdownV2", ...extra });
  }
  replyItWithMarkdownV2(markdown, extra) {
    return this.replyIt(markdown, { parse_mode: "MarkdownV2", ...extra });
  }
  /**
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  replyWithHTML(html, extra) {
    return this.reply(html, { parse_mode: "HTML", ...extra });
  }
  replyItWithHTML(text, extra) {
    return this.replyIt(text, { parse_mode: "HTML", ...extra });
  }
  /**
   * @see https://core.telegram.org/bots/api#deletemessage
   */
  deleteMessage(messageId) {
    this.assert(this.chat, "deleteMessage");
    if (typeof messageId !== "undefined") {
      return this.telegram.deleteMessage(this.chat.id, messageId);
    }
    const message = getMessageFromAnySource(this);
    this.assert(message, "deleteMessage");
    return this.telegram.deleteMessage(this.chat.id, message.message_id);
  }
  /**
   * Context-aware shorthand for {@link Telegram.deleteMessages}
   * @param messageIds Identifiers of 1-100 messages to delete. See deleteMessage for limitations on which messages can be deleted
   */
  deleteMessages(messageIds) {
    this.assert(this.chat, "deleteMessages");
    return this.telegram.deleteMessages(this.chat.id, messageIds);
  }
  /**
   * @see https://core.telegram.org/bots/api#forwardmessage
   */
  forwardMessage(chatId, extra) {
    const message = getMessageFromAnySource(this);
    this.assert(message, "forwardMessage");
    return this.telegram.forwardMessage(
      chatId,
      message.chat.id,
      message.message_id,
      extra,
    );
  }
  /**
   * Shorthand for {@link Telegram.forwardMessages}
   * @see https://core.telegram.org/bots/api#forwardmessages
   */
  forwardMessages(chatId, messageIds, extra) {
    this.assert(this.chat, "forwardMessages");
    return this.telegram.forwardMessages(
      chatId,
      this.chat.id,
      messageIds,
      extra,
    );
  }
  /**
   * @see https://core.telegram.org/bots/api#copymessage
   */
  copyMessage(chatId, extra) {
    const message = getMessageFromAnySource(this);
    this.assert(message, "copyMessage");
    return this.telegram.copyMessage(
      chatId,
      message.chat.id,
      message.message_id,
      extra,
    );
  }
  /**
   * Context-aware shorthand for {@link Telegram.copyMessages}
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageIds Identifiers of 1-100 messages in the chat from_chat_id to copy. The identifiers must be specified in a strictly increasing order.
   */
  copyMessages(chatId, messageIds, extra) {
    var _a;
    this.assert(this.chat, "copyMessages");
    return this.telegram.copyMessages(chatId, this.chat?.id, messageIds, extra);
  }
  /**
   * @see https://core.telegram.org/bots/api#approvechatjoinrequest
   */
  approveChatJoinRequest(...args) {
    this.assert(this.chat, "approveChatJoinRequest");
    return this.telegram.approveChatJoinRequest(message.chat.id, ...args);
  }

  /**
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   */
  declineChatJoinRequest(...args) {
    this.assert(this.chat, "declineChatJoinRequest");
    return this.telegram.declineChatJoinRequest(message.chat.id, ...args);
  }

  /**
   * @see https://core.telegram.org/bots/api#banchatsenderchat
   */
  banChatSenderChat(...args) {
    this.assert(this.chat, "banChatSenderChat");
    return this.telegram.banChatSenderChat(this.chat.id, ...args);
  }

  /**
   * @see https://core.telegram.org/bots/api#unbanchatsenderchat
   */
  unbanChatSenderChat(...args) {
    this.assert(this.chat, "unbanChatSenderChat");
    return this.telegram.unbanChatSenderChat(this.chat.id, ...args);
  }
  /**
   * Use this method to change the bot's menu button in the current private chat. Returns true on success.
   * @see https://core.telegram.org/bots/api#setchatmenubutton
   */
  setChatMenuButton(menuButton) {
    this.assert(this.chat, "setChatMenuButton");
    return this.telegram.setChatMenuButton({
      chatId: this.chat.id,
      menuButton,
    });
  }
  /**
   * Use this method to get the current value of the bot's menu button in the current private chat. Returns MenuButton on success.
   * @see https://core.telegram.org/bots/api#getchatmenubutton
   */
  getChatMenuButton() {
    this.assert(this.chat, "getChatMenuButton");
    return this.telegram.getChatMenuButton({ chatId: this.chat.id });
  }
  /**
   * @see https://core.telegram.org/bots/api#setmydefaultadministratorrights
   */
  setMyDefaultAdministratorRights(extra) {
    return this.telegram.setMyDefaultAdministratorRights(extra);
  }
  /**
   * @see https://core.telegram.org/bots/api#getmydefaultadministratorrights
   */
  getMyDefaultAdministratorRights(extra) {
    return this.telegram.getMyDefaultAdministratorRights(extra);
  }
}

function getMessageFromAnySource(ctx) {
  return (
    ctx.message ??
    ctx.editedMessage ??
    ctx.callbackQuery?.message ??
    ctx.channelPost ??
    ctx.editedChannelPost
  );
}

function getThreadId(ctx) {
  const msg = ctx.msg;
  return msg?.isAccessible()
    ? msg.is_topic_message
      ? msg.message_thread_id
      : undefined
    : undefined;
}
