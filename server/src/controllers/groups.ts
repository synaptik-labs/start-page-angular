import { Get, Route } from 'tsoa';
import { Db } from '../db';
import { Logger } from '../logger';

@Route('/groups')
export class GroupController {

	@Get('{groupGroupName}')
	public async getGroups(groupGroupName:string) {
		let result: any = [];
		const groupGroup: any = await Db.query(`SELECT * FROM group_groups WHERE name = '${groupGroupName}'`);
		if (groupGroup[0]) {
			Logger.info(`groupGroup: `, groupGroup);
			result = await Db.query(`SELECT * FROM \`groups\` WHERE group_groups_id = ${groupGroup[0].id}`);
		} else {
			const newGroupGroup: any = await Db.query(`INSERT INTO group_groups (name) VALUES ('${groupGroupName}')`);
			Logger.info(`newGroupGroup: `, newGroupGroup);
			result = [];
		}

		return result;
	}
}