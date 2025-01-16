import { Composer } from "telegraf";
import * as db from "../model/database";
import { logger } from "..";

export const ban = Composer.command("ban", async (ctx) => {
    if(ctx.from?.id.toString() != process.env.ADMIN_ID!) return;

    const userId = Number(ctx.message.text.split(" ").slice(1));

    const user = db.getUserById(userId);
    if (!user) {
        ctx.reply(`юзера не существует!`);
        return;
    }

    user.setBanned(true);

    logger.info(`${ctx.from.id} || ${ctx.from.username} executed /ban. banned ${user.tId} || ${user.username}`);

    await ctx.reply(`пользователь жестоко выебан в жопу`);
});

export const unban = Composer.command("unban", async (ctx) => {
    if(ctx.from?.id.toString() != process.env.ADMIN_ID!) return;

    const userId = Number(ctx.message.text.split(" ").slice(1));

    const user = db.getUserById(userId);
    if (!user) {
        ctx.reply(`юзера не существует!`);
        return;
    }

    user.setBanned(false);

    logger.info(`${ctx.from.id} || ${ctx.from.username} executed /unban. unbanned ${user.tId} || ${user.username}`);

    await ctx.reply(`плебей помилован`);
});