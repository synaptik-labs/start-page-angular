import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class BookmarkLink {
	public url: string;
	public label: string;
}
class BookmarkGroup {
	public label: string;
	public color: string;
	public links: Array<BookmarkLink>;
}

@Injectable()
class BookmarkService {
	constructor(private storage: StorageService) {
	}

	public getBookmarks(): Observable<Array<BookmarkGroup>> {
		return this.storage.get('bookmarks').pipe(map((data: any) => {
			if (!data) {
				data = [];
			}
			return data;
		}));
	}

	public setBookmarks(bookmarks: Array<BookmarkGroup>): Observable<void> {
		return this.storage.set('bookmarks', bookmarks);
	}
}

export { BookmarkService, BookmarkGroup, BookmarkLink };
