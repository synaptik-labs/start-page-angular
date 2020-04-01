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
		if (this.cachedBookmarks) {
			return of(this.cachedBookmarks);
		}
		return this.http.get<Array<BookmarkGroup>>(`http://localhost:8080/api/tags/${tag}`).pipe(map((data: Array<BookmarkGroup>) => {
			this.cachedBookmarks = data;
			return data;
		}));
	}

	public setBookmarks(bookmarks: Array<BookmarkGroup>): void {
		this.cachedBookmarks = bookmarks;
	}

	public saveBookmarks(tag: string): Observable<any> {
		return this.http.post(`http://localhost:8080/api/tags/${tag}`, this.cachedBookmarks);
	}
}

export { BookmarkService, BookmarkGroup, BookmarkLink };
