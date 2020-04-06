import { Get, Route } from 'tsoa';
import { Db } from '../db';
import { BookmarkGroup, BookmarkLink } from './group.controller';

@Route('/tags')
export class TagController {

	@Get('{tagName}')
	public async get(tagName:string): Promise<Array<BookmarkGroup>> {
		let result: any = [];

		let resultSet: any = await Db.query(`SELECT * FROM \`groups\` WHERE tag = ?`, [tagName]);
		if (resultSet) {
			for (let idx = 0; idx < resultSet.length; idx ++) {
				const bookmarkGroup: BookmarkGroup = new BookmarkGroup();
				const group_id: number = resultSet[idx].id;
				bookmarkGroup.id = group_id;
				bookmarkGroup.label = resultSet[idx].label;
				bookmarkGroup.color = resultSet[idx].color;
				bookmarkGroup.tag = resultSet[idx].tag;
				bookmarkGroup.links = [];
				let linksResultSet: any = await Db.query(`SELECT * FROM links WHERE group_id = ?`, [group_id]);
				if (linksResultSet) {
					for (let idx2 = 0; idx2 < linksResultSet.length; idx2 ++) {
						const link: BookmarkLink = new BookmarkLink();
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