import { Composer } from "telegraf";
import * as db from "../model/database";
import { logger } from "..";

export const start = Composer.command("start", async (ctx) => {
    if(db.getUserByTId(ctx.from!.id) != undefined && db.getUserByTId(ctx.from!.id)!.isBanned == true) return;
    if(!ctx.from?.id || !ctx.from?.username) return;

    logger.info(`${ctx.from.id} || ${ctx.from.username} executed /start`);

    await ctx.reply(`добро пожаловать!\n\nданный бот создан для того, чтобы записаться на типирование. если интересует — жми кнопку ниже!`, {reply_markup: {inline_keyboard: [[{text: 'записаться на типирование', callback_data: 'typereg'}]]}});
})