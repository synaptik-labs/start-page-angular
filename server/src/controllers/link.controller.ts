import { Route, Post, Body, Delete, Put } from 'tsoa';
import { Db } from '../db';
import { Logger } from '../logger';
import { URL } from 'url';
import fetch, { Response } from 'node-fetch';
import * as cheerio from 'cheerio';

export class BookmarkLink {
	id?: number;
	label: string;
	url: string;
	icon?: string;
}

@Route('/tags')
export class LinkController {

	protected async resourceExists(url: string): Promise<boolean> {
		const resp: Response = await fetch(url);
		const result: boolean = resp.status === 200;
		return result;
	}

	protected async verifyAndUpdateIcon(link: BookmarkLink): Promise<void> {
		if (link.icon && link.icon.length > 0) {
			if (!(await this.resourceExists(link.icon))) {
				link.icon = undefined;
			}
		}

		const url: URL = new URL(link.url);
		const urlResponse: Response = await fetch(link.url);
		const body: string = await urlResponse.text();
		const $: any = cheerio.load(body);

		const SUPPORTED_RELS: string[] = ['icon', 'shortcut icon', 'apple-touch-icon'];
		for (const supportedRel of SUPPORTED_RELS) {
			const icons: any = $(`link[rel='${supportedRel}']`);
			if (icons.length > 0) {
				let iconUrl: string = icons.attr('href');
				if (!iconUrl.startsWith("http")) {
					if (iconUrl.startsWith("/")) {
						iconUrl = `${url.origin}${iconUrl}`;
					} else {
						iconUrl = `${url.origin}${url.pathname}${iconUrl}`;
					}
				}
				link.icon = iconUrl;
				Logger.info(`link url = ${link.icon}`);
			}
		}

		if (!link.icon) {
			link.icon = `${url.origin}${url.pathname}favicon.ico`;
			if (!(await this.resourceExists(link.icon))) {
				link.icon = `${url.origin}favicon.ico`;
			}
		}
	}

	@Post('{tagName}/groups/{groupId}/links')
	public async create(tagName: string, groupId: number, @Body() input: BookmarkLink): Promise<BookmarkLink> {
		await this.verifyAndUpdateIcon(input);

		const dbResult: any = await Db.query(`INSERT INTO \`links\` (group_id, label, url, icon) VALUES (?, ?, ?, ?)`, [groupId, input.label, input.url, input.icon]);
		Logger.info(`input: `, input);

		const result: BookmarkLink = {id: dbResult.insertId, ...input};
		Logger.info(`result: `, result);

		return result;
	}

	@Put('{tagName}/groups/{groupId}/links/{id}')
	public async update(tagName: string, groupId: number, id: number, @Body() input: BookmarkLink): Promise<BookmarkLink> {
		await this.verifyAndUpdateIcon(input);

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