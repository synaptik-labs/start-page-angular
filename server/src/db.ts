import * as mysql from 'mysql';
import { Logger } from './logger';

export class Db {
	private static _pool: mysql.Pool;

	public static init() {
		Db._pool = mysql.createPool({
			connectionLimit: 10,
			host     : '10.0.0.128',
			user     : 'startpage',
			password : 'password',
			database : 'startpage'
		});
	}

	public static close() {
		if (Db._pool) {
			Logger.info('Closing pool.');

			Db._pool.end();
			Db._pool = undefined;
		}
	}

	public static getPool() : mysql.Pool {
		return Db._pool;
	}

	public static async query(sql: string, values?: any) : Promise<any> {
		return new Promise((resolve: Function, reject: Function) => {
			Db._pool.query(sql, values, (error: mysql.MysqlError, results: any, fields: mysql.FieldInfo[]) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	}

	public static async querySingle(sql: string, values?: any) : Promise<any> {
		let resultSet: any = await Db.query(sql, values);
		if (resultSet && resultSet[0]) {
			resultSet = resultSet[0];
		}
		return resultSet;
	}
}

