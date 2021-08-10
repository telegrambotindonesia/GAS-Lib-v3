## Update Type

Di pergunakan saat deteksi trigger `on`.

```javascript
bot.on('message', ()=>{});
bot.on('photo', ()=>{});

// ... etc
```

Tipe update tersedia adalah sebagai berikut. Keterangan masing-masing tipe ada di dalam referensi sumber asli.

### Type

- message
- edited_message
- channel_post
- edited_channel_post
- inline_query
- chosen_inline_result
- callback_query
- shipping_query
- pre_checkout_query
- poll
- poll_answer
- my_chat_member
- chat_member

Ref: [update](https://core.telegram.org/bots/api#update)

### Sub Type

- text
- reply_to_message
- reply_markup
- via_bot
- edit_date
- author_signature
- entities
- animation
- audio
- document
- photo
- sticker
- video
- video_note
- voice
- caption
- caption_entities
- media_group_id
- contact
- dice
- game
- poll
- venue
- location
- new_chat_members
- left_chat_member
- new_chat_title
- new_chat_photo
- delete_chat_photo
- group_chat_created
- supergroup_chat_created
- channel_chat_created
- message_auto_delete_timer_changed
- migrate_to_chat_id
- migrate_from_chat_id
- pinned_message
- invoice
- successful_payment
- connected_website
- passport_data
- proximity_alert_triggered
- voice_chat_scheduled
- voice_chat_started
- voice_chat_ended
- voice_chat_participants_invited

Ref: [message](https://core.telegram.org/bots/api#message)

### Entity Type

- `mention` @username
- `hashtag` #hashtag
- `cashtag` $USD
- `bot_command` /start@jobs_bot
- `url` https://telegram.org
- `email` do-not-reply@telegram.org
- `phone_number` +1-212-555-0123
- `bold` **bold text**
- `italic` _italic text_
- `underline` underlined text
- `strikethrough` strikethrough text
- `code` monowidth string
- `pre` monowidth block
- `text_link` for clickable text URLs
- `text_mention` for users without usernames

Ref: [Entity](https://core.telegram.org/bots/api#messageentity)
