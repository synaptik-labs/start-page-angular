import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

class BookmarkLink {
	public url: string;
	public label: string;
	public icon: string;

	constructor(input?: BookmarkLink) {
		if (input) {
			this.copy(input);
		} else {
			this.url = '';
			this.label = '';
			this.icon = '';
		}
	}

	public copy(input: BookmarkLink): void {
		this.url = input.url;
		this.label = input.label;
		this.icon = input.icon;
	}
}
class BookmarkGroup {
	public label: string;
	public color: string;
	public links: Array<BookmarkLink>;

	constructor() {
		this.label = '';
		this.color = 'white';
		this.links = [];
	}
}

@Injectable()
class BookmarkService {
	private cachedBookmarks: Array<BookmarkGroup>;

	constructor(private storage: StorageService) {
	}

	public getBookmarks(): Observable<Array<BookmarkGroup>> {
		if (this.cachedBookmarks) {
			return of(this.cachedBookmarks);
		}
		return this.storage.get('bookmarks').pipe(map((data: any) => {
			if (!data) {
				this.cachedBookmarks = [];
			} else {
				this.cachedBookmarks = JSON.parse(data);
			}
			return this.cachedBookmarks;
		}));
	}

	public setBookmarks(bookmarks: Array<BookmarkGroup>): Observable<void> {
		return this.storage.set('bookmarks', JSON.stringify(bookmarks));
	}

	public saveBookmarks(): Observable<void> {
		return this.setBookmarks(this.cachedBookmarks);
	}
}

export { BookmarkService, BookmarkGroup, BookmarkLink };
