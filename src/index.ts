import { Scenes, Telegraf } from "telegraf";
import Database from "better-sqlite3";
import { stage, typeregCallback } from "./callback/typereg";
import { start } from "./commands/start";
import { ban } from "./commands/ban";

export const db = new Database('/home/creepy0964/Code/js/socio-bot/db/database.db');
export const bot = new Telegraf<Scenes.WizardContext>('5118259434:AAHZcwNbU_IlbVJmUtu8V-jm2Rp6wxrZ63k');

bot.use(stage.middleware());
bot.use(start, ban, typeregCallback);

db.prepare(`CREATE TABLE IF NOT EXISTS "users" (
	"userId"	INTEGER NOT NULL,
	"tId"	INTEGER NOT NULL,
	"username"	TEXT NOT NULL,
	"isBanned"	TEXT NOT NULL,
	PRIMARY KEY("userId" AUTOINCREMENT)
)`).run();
bot.launch(() => { console.log('Bot started') });

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());