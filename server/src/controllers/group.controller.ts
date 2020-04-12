import { Route, Post, Body, Delete, Put } from 'tsoa';
import { Db } from '../db';
import { Logger } from '../logger';
import { BookmarkLink } from './link.controller';

export class BookmarkGroup {
	id?: number;
	label: string;
	color: string;
	tag?: string;
	links?: Array<BookmarkLink>;
}

@Route('/tags')
export class GroupController {

	@Post('{tagName}/groups')
	public async create(tagName: string, @Body() input: BookmarkGroup): Promise<BookmarkGroup> {
		const dbResult: any = await Db.query(`INSERT INTO \`groups\` (label, color, tag) VALUES (?, ?, ?)`, [input.label, input.color, tagName]);
		Logger.info(`input: `, input);

		const result: BookmarkGroup = {id: dbResult.insertId, ...input};
		Logger.info(`result: `, result);

		return result;
	}

	@Put('{tagName}/groups/{id}')
	public async update(tagName: string, id: number, @Body() input: BookmarkGroup): Promise<BookmarkGroup> {
		const dbResult: any = await Db.query(`UPDATE \`groups\` SET label=?, color=? WHERE id = ?`, [input.label, input.color, id]);

		const result: BookmarkGroup = {...input};

		return result;
	}

	@Delete('{tagName}/groups/{id}')
	public async delete(tagName: string, id: number): Promise<BookmarkGroup> {
		let result: BookmarkGroup = undefined;

		const dbResult: any = await Db.query(`DELETE FROM \`groups\` WHERE id = ?`, [id]);

		return result;
	}
}