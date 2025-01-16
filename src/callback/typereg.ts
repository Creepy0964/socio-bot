import { Scenes, session } from "telegraf";
import { Composer } from "telegraf";
import { typeregWizard } from "../wizard/typereg";
import { MyContext } from "../model/interface";

const composer = new Composer<MyContext>();

export const stage = new Scenes.Stage<MyContext>([typeregWizard]);

composer.use(session());
composer.use(stage.middleware());

export const typeregCallback = composer.action("typereg", (ctx) => { ctx.scene.enter('register') });