import { Composer } from "telegraf";
import * as db from "../model/database";

export const start = Composer.command("start", async (ctx) => {
    if(!ctx.from?.id || !ctx.from?.username) return;

    await ctx.reply(`добро пожаловать!\n\nданный бот создан для того, чтобы записаться на типирование. если интересует — жми кнопку ниже!`, {reply_markup: {inline_keyboard: [[{text: 'записаться на типирование', callback_data: 'typereg'}]]}});
})