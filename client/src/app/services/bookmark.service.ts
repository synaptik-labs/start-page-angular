import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

class BookmarkLink {
	public url: string;
	public label: string;
	public icon: string;

	constructor(input?: BookmarkLink) {
		if (input) {
			this.url = input.url;
			this.label = input.label;
			this.icon = input.icon;
		} else {
			this.url = '';
			this.label = '';
			this.icon = '';
		}
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

	constructor(private http: HttpClient) {
	}

	public getBookmarks(tag: string): Observable<Array<BookmarkGroup>> {
		return this.http.get(`http://localhost:8080/api/groups/${tag}`).pipe(map((data: any) => {
			return data;
		}));
	}

	public setBookmarks(bookmarks: Array<BookmarkGroup>): Observable<void> {
		return of();
	}

	public saveBookmarks(): Observable<void> {
		return this.setBookmarks(this.cachedBookmarks);
	}
}

export { BookmarkService, BookmarkGroup, BookmarkLink };
