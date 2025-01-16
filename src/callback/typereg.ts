import { Scenes, session } from "telegraf";
import { Composer } from "telegraf";
import { typeregWizard } from "../wizard/typereg";
import * as db from "../model/database";
import { Stage } from "telegraf/scenes";

const composer = new Composer<Scenes.WizardContext>();

export const stage = new Scenes.Stage<Scenes.WizardContext>([typeregWizard]);

composer.use(session());
composer.use(stage.middleware());

export const typeregCallback = composer.action("typereg", (ctx) => { ctx.scene.enter('register') });