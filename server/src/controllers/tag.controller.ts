import { Get, Route, Post, Body, Path } from 'tsoa';
import { Db } from '../db';
import { BookmarkGroup, BookmarkLink } from './group.controller';

@Route('/tags')
export class TagController {

	@Get('{tagName}')
	public async get(tagName:string): Promise<Array<BookmarkGroup>> {
		let result: any = [];

		let resultSet: any = await Db.query(`SELECT * FROM \`groups\` WHERE tag = ?`, [tagName]);
		if (resultSet) {
			const bookmarkGroup: BookmarkGroup = new BookmarkGroup();
			for (let idx = 0; idx < resultSet.length; idx ++) {
				const group_id: number = resultSet[idx].id;
				bookmarkGroup.id = group_id;
				bookmarkGroup.label = resultSet[idx].label;
				bookmarkGroup.color = resultSet[idx].color;
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

	@Post('{tagName}')
	public async create(@Path() tagName:string, @Body() data): Promise<any> {
		console.log(data);
	}

}