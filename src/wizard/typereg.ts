import { Composer } from "telegraf";
import { bot } from "..";
import * as db from "../model/database";
import { Markup, Scenes } from "telegraf";

interface userData {
    typology: string;
    experience: string;
    type: string;
    anquette: string;
} 

let data: userData = {
    typology: "",
    experience: "",
    type: "",
    anquette: ""
}

export const typeregWizard = new Scenes.WizardScene<Scenes.WizardContext>('register',
    async (ctx) => {
        try {
            const user = db.getUserByTId(ctx.from?.id!);
            if(user) {
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

        return ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) data.typology = ctx.message!.text!;

        await ctx.reply(`отлично! теперь, укажи свой опыт знакомства с данной типологией: `, Markup.keyboard([
            ['менее полугода', 'от 0.5 до 1 года', 'от 1 до 3 лет', 'более 3 лет']
        ]).oneTime().resize());

        return ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) data.experience = ctx.message!.text!

        await ctx.reply(`превосходно. теперь, укажи свои типологии, если знаешь. если нет: жми на кнопку ниже`, Markup.keyboard([
            ['не имею типологий']
        ]).oneTime().resize());

        return ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) data.type = ctx.message!.text!

        await ctx.reply(`замечательно. напоследок, укажи предпочитаемый тип заполнения анкеты: `, Markup.keyboard([
            ['голосовыми сообщениями', 'текстом']
        ]).oneTime().resize());

        return ctx.wizard.next();
    },
    async (ctx) => {
        if(ctx.message && 'text' in ctx.message) data.anquette = ctx.message!.text!

        await bot.telegram.sendMessage(814958085, `новая запись\n\nот кого: ${ctx.from?.username}\nтипология: ${data.typology}\nопыт типологий: ${data.experience}\nкак сейчас типируется: ${data.type}\nтип заполнения: ${data.type}`);

        // TODO: ссылка на правила анкетирования
        await ctx.reply(`готово! я записал тебя на типирование. пока ты ждешь ответа, я НАСТОЯТЕЛЬНО рекомендую ознакомиться тебе с правилами анкетирования по данной ссылке: `);

        return ctx.scene.leave();
    }
);