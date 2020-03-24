import { Get, Route } from 'tsoa';
import { Db } from '../db';
import { Logger } from '../logger';

@Route('/groups')
export class GroupController {

	@Get('{tagName}')
	public async getGroups(tagName:string) {
		let result: any = [];

		let resultSet: any = await Db.query(`SELECT * FROM \`groups\` WHERE tag = ?`, [tagName]);
		if (resultSet) {
			const bookmarkGroup: any = {};
			for (let idx = 0; idx < resultSet.length; idx ++) {
				const group_id: number = resultSet[idx].id;
				bookmarkGroup.id = group_id;
				bookmarkGroup.label = resultSet[idx].label;
				bookmarkGroup.color = resultSet[idx].color;
				bookmarkGroup.links = [];
				let linksResultSet: any = await Db.query(`SELECT * FROM links WHERE group_id = ?`, [group_id]);
				if (linksResultSet) {
					for (let idx2 = 0; idx2 < linksResultSet.length; idx2 ++) {
						const link: any = {};
						link.id = linksResultSet[idx2].id;
						link.label = linksResultSet[idx2].label;
						link.url = linksResultSet[idx2].url;
						link.icon = linksResultSet[idx2].icon;
						bookmarkGroup.links.push(link);
					}
				}
				result.push(bookmarkGroup);
			}
		}

		return result;
	}
}