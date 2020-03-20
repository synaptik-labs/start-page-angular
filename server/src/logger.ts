import * as winston from 'winston';

export class Logger {
	private static logger : winston.Logger;

	private static init() {
		if (!Logger.logger) {
			;
			Logger.logger = winston.createLogger({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.json()
				),
				transports: [
					new winston.transports.Console({
						format: winston.format.simple()
					})
				]
			});
		}
	}

	public static info(msg: string, ...meta: any[]) : void {
		Logger.init();
		Logger.logger.info(msg, meta);
	}

	public static debug(msg: string, ...meta: any[]) : void {
		Logger.init();
		Logger.logger.debug(msg, meta);
	}

	public static warn(msg: string, ...meta: any[]) : void {
		Logger.init();
		Logger.logger.warn(msg, meta);
	}

	public static error(msg: string, ...meta: any[]) : void {
		Logger.init();
		Logger.logger.error(msg, meta);
	}

}