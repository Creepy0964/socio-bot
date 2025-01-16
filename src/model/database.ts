import { UserI } from "./interface";
import { db } from "..";
import { User } from "@telegraf/types";

export function getUserById(userId: number) {
    const user: any = db.prepare(`SELECT * FROM users WHERE userId = ?`).get(userId);
    return new BotUser(user.userId, user.tId, user.username, Boolean(user.isBanned));
}

export function getUserByTId(tId: number) {
    const user: any = db.prepare(`SELECT * FROM users WHERE tId = ?`).get(tId);
    console.log(user);
    return new BotUser(user.userId, user.tId, user.username, Boolean(user.isBanned));
}

export function addUser(tUser: User) {
    if(typeof(tUser.username) === undefined) return Error("username is undefined");
    const user = db.prepare(`INSERT INTO users (tId, username, isBanned) VALUES (?, ?, ?)`).run(tUser.id, tUser.username, 'false');
    return new BotUser(Number(user.lastInsertRowid), tUser.id, tUser.username!, false);
}

class BotUser implements UserI {
    userId: number;
    tId: number;
    username: string;
    isBanned: boolean;

    constructor(uid: number, tId: number, username: string, isBanned: boolean) {
        this.userId = uid;
        this.tId = tId;
        this.username = username;
        this.isBanned = isBanned;
    }

    setBanned(status: boolean) {
        const user = db.prepare(`UPDATE users SET isBanned = ? WHERE userId = ?`).run(status.toString(), this.userId);
        this.isBanned = status;
        return user.changes;
    }
}