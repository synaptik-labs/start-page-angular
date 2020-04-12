import { Route, Post, Body, Delete, Put } from 'tsoa';
import { Db } from '../db';
import { Logger } from '../logger';

export class BookmarkLink {
	id?: number;
	label: string;
	url: string;
	icon?: string;
}

@Route('/tags')
export class LinkController {

	@Post('{tagName}/groups/{groupId}/links')
	public async create(tagName: string, groupId: number, @Body() input: BookmarkLink): Promise<BookmarkLink> {
		if (!input.icon) {
			input.icon = `${input.url}/favicon.ico`;
		}

		const dbResult: any = await Db.query(`INSERT INTO \`links\` (group_id, label, url, icon) VALUES (?, ?, ?, ?)`, [groupId, input.label, input.url, input.icon]);
		Logger.info(`input: `, input);

		const result: BookmarkLink = {id: dbResult.insertId, ...input};
		Logger.info(`result: `, result);

		return result;
	}

	@Put('{tagName}/groups/{groupId}/links/{id}')
	public async update(tagName: string, groupId: number, id: number, @Body() input: BookmarkLink): Promise<BookmarkLink> {
		const dbResult: any = await Db.query(`UPDATE \`links\` SET label=?, url=?, icon=? WHERE group_id = ? AND id = ?`, [input.label, input.url, input.icon, groupId, id]);

		const result: BookmarkLink = {...input};

		return result;
	}

	@Delete('{tagName}/groups/{groupId}/links/{id}')
	public async delete(tagName: string, groupId: number, id: number): Promise<BookmarkLink> {
		let result: BookmarkLink = undefined;

		const dbResult: any = await Db.query(`DELETE FROM \`links\` WHERE group_id = ? AND id = ?`, [groupId, id]);

		return result;
	}
}