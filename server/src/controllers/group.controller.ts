import { Get, Route, Post, Path, Body } from 'tsoa';
import { Db } from '../db';

export class BookmarkLink {
	id: number;
	label: string;
	url: string;
	icon: string;
}

export class BookmarkGroup {
	id: number;
	label: string;
	color: string;
	links: Array<BookmarkLink>;
}

@Route('/tags')
export class GroupController {

	@Post('{tagName}/groups')
	public async create(tagName: string, @Body() input: BookmarkGroup): Promise<BookmarkGroup> {
		let result: any = [];

		console.log(input);

		return result;
	}
}