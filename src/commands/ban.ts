import { Composer } from "telegraf";
import * as db from "../model/database";

export const ban = Composer.command("ban", async (ctx) => {
    if(ctx.from?.id.toString() != process.env.ADMIN_ID!) return;

    const userId = Number(ctx.message.text.split(" ").slice(1));

    const user = db.getUserById(userId);
    if (!user) {
        ctx.reply(`юзера не существует!`);
        return;
    }

    user.setBanned(true);

    await ctx.reply(`пользователь жестоко выебан в жопу`);
});