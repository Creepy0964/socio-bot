import { Telegraf } from "telegraf";
import Database from "better-sqlite3";
import { typeregCallback } from "./callback/typereg";
import { start } from "./commands/start";
import { ban, unban } from "./commands/ban";
import { MyContext } from "./model/interface";
import { Logger } from "./utils/logger";

export const db = new Database('./db/database.db');
export const bot = new Telegraf<MyContext>(process.env.TOKEN!);
export const logger = new Logger(3);

bot.use(start, ban, unban, typeregCallback);

db.prepare(`CREATE TABLE IF NOT EXISTS "users" (
	"userId"	INTEGER NOT NULL,
	"tId"	INTEGER NOT NULL,
	"username"	TEXT NOT NULL,
	"isBanned"	TEXT NOT NULL,
	PRIMARY KEY("userId" AUTOINCREMENT)
)`).run();

bot.launch(() => { logger.info('Bot started') });

process.once('SIGINT', () => { logger.info('Bot stopped'); bot.stop() });
process.once('SIGTERM', () => { logger.info('Bot stopped'); bot.stop() });