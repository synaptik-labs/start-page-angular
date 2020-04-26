import { Logger } from "./logger";

export class Props {

    private static _props: Map<string, string>;

    private static init() : void {
        const REQUIRED_PROPS: string[] = ['MYSQL_HOST', 'MYSQL_DB', 'MYSQL_USER', 'MYSQL_PASSWORD'];
        const config = require('../config.json');
        this._props = new Map<string, string>();

        for (let propKey of REQUIRED_PROPS) {
            this._props.set(propKey, config[propKey] || process.env[propKey]);
        }
    }

    public static get(key: string): string {
        if (!this._props) {
            this.init();
        }
        let result: string = this._props.get(key);
        Logger.info(`${key} = ${result}`);
        return result;
    }
}