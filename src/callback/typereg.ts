import { Scenes, session } from "telegraf";
import { Composer } from "telegraf";
import { typeregWizard } from "../wizard/typereg";
import { MyContext } from "../model/interface";
import { logger } from "..";

const composer = new Composer<MyContext>();

export const stage = new Scenes.Stage<MyContext>([typeregWizard]);

composer.use(session());
composer.use(stage.middleware());

export const typeregCallback = composer.action("typereg", (ctx) => { logger.debug(`${ctx.from!.id} || ${ctx.from!.username} executed wizard`); ctx.scene.enter('register') });