import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

class BookmarkLink {
	public id?: number;
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

@Injectable()
class BookmarkLinkService {

	constructor(private http: HttpClient) {
	}

	// public get(tag: string, id: number): Observable<BookmarkGroup> {
	// 	return this.http.get<BookmarkGroup>(`http://localhost:8080/api/tags/${tag}/groups/${id}`);
	// }

	// public create(tag: string, data: BookmarkGroup): Observable<BookmarkGroup> {
	// 	return this.http.post<BookmarkGroup>(`http://localhost:8080/api/tags/${tag}/groups`, data);
	// }

	// public update(tag: string, data: BookmarkGroup): Observable<BookmarkGroup> {
	// 	return this.http.post<BookmarkGroup>(`http://localhost:8080/api/tags/${tag}/groups/${data.id}`, data);
	// }

	// public delete(tag: string): Observable<void> {
	// 	return this.http.delete<void>(`http://localhost:8080/api/tags/${tag}/groups`);
	// }
}

export { BookmarkLinkService, BookmarkLink };
