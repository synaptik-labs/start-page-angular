import * as http from 'http';
import { main } from './main';
import { Db } from './db';
import { Logger } from './logger';

const port: string|number = process.env.PORT || 8080;
main.express.set('port', port);

async function init() {
	const server: http.Server = http.createServer(main.express);
	server.listen(port);
	server.on('listening', onListening);
	server.on('close', shutdown);
	server.on('error', onError);
	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);

	function onListening() : void {
		const addr: any = server.address();
		Logger.info(`Listening on ${addr.address}:${addr.port}`);
		Db.init();
	}
	function onError(error: any) : void {
		Logger.error(`Caught error: `, error);
	}
}

function shutdown() : void {
	Db.close();
	process.exit(0);
}

init();
