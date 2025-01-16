import { bot } from "..";
import * as db from "../model/database";
import { Markup, Scenes } from "telegraf";
import { MyContext } from "../model/interface";

export const typeregWizard = new Scenes.WizardScene<MyContext>('register',
    async (ctx) => {
        try {
            if(db.getUserByTId(ctx.from?.id!)) {
                await ctx.reply(`упс! ты уже регистрировался на типирование ранее :(`);
                return ctx.scene.leave();
            }
        }
        catch {
            db.addUser(ctx.from!);
        }

        await ctx.reply(`итак, регистрация на типирование. предлагаю тебе два варианта: `, Markup.keyboard([
            ['соционика', 'психософия']
        ]).oneTime().resize());

        ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) ctx.session.typology = ctx.message!.text!;

        await ctx.reply(`отлично! теперь, укажи свой опыт знакомства с данной типологией: `, Markup.keyboard([
            ['менее полугода', 'от 0.5 до 1 года', 'от 1 до 3 лет', 'более 3 лет']
        ]).oneTime().resize());

        ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) ctx.session.experience = ctx.message!.text!;

        await ctx.reply(`превосходно. теперь, укажи свои типологии, если знаешь. если нет: жми на кнопку ниже`, Markup.keyboard([
            ['не имею типологий']
        ]).oneTime().resize());

        ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) {
            ctx.session.type = ctx.message!.text!
        }

        await ctx.reply(`замечательно. напоследок, укажи предпочитаемый тип заполнения анкеты: `, Markup.keyboard([
            ['голосовыми сообщениями', 'текстом']
        ]).oneTime().resize());

        ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) {
            ctx.session.anquette = ctx.message!.text!
        }

        await bot.telegram.sendMessage(process.env.ADMIN_ID!, `новая запись\n\nот кого: ${ctx.from?.username}\nтипология: ${ctx.session.typology}\nопыт типологий: ${ctx.session.experience}\nкак сейчас типируется: ${ctx.session.type}\nтип заполнения: ${ctx.session.anquette}`);

        await ctx.reply(`готово! я записал тебя на типирование. пока ты ждешь ответа, я НАСТОЯТЕЛЬНО рекомендую ознакомиться тебе с правилами анкетирования по данной ссылке: https://teletype.in/@creepy0964/typing_rules`);

        return ctx.scene.leave();
    }
);