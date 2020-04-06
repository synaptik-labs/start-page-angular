import { Route, Post, Body, Delete, Put } from 'tsoa';
import { Db } from '../db';
import { Logger } from '../logger';

export class BookmarkLink {
	id?: number;
	label: string;
	url: string;
	icon: string;
}

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

		const result: BookmarkGroup = {id: dbResult.insertId, ...input};

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