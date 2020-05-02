import * as express from 'express';
import * as bodyParser  from 'body-parser';
import * as cors  from 'cors';
import { RegisterRoutes } from './routes';

import './controllers/tag.controller';
import './controllers/group.controller';

export class Main {
	public express: express.Express;

	constructor() {
		this.express = express();
		this.express.use(bodyParser.json());
		this.express.use(cors());

		RegisterRoutes(this.express);
		this.express.use('/', express.static('public_html'));
	}
}

const main: Main = new Main();

export { main };