import { Context, Scenes } from "telegraf";

export interface UserI {
    userId: number,
    tId: number,
    username: string,
    isBanned: boolean
}

interface SessionData extends Scenes.WizardSession {
    typology: string;
    experience: string;
    type: string;
    anquette: string;
}

export interface MyContext extends Context {
    scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
	wizard: Scenes.WizardContextWizard<MyContext>;
    session: SessionData;
}