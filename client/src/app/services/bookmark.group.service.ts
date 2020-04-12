import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookmarkLink } from './bookmark.link.service';

class BookmarkGroup {
	public id?: number;
	public label: string;
	public color: string;
	public tag: string;
	public links: Array<BookmarkLink>;

	constructor(input?: BookmarkGroup) {
		if (input) {
			this.label = input.label;
			this.color = input.color;
			this.tag = input.tag;
			this.links = [];
			for (const link of input.links) {
				this.links.push(new BookmarkLink(link));
			}
		} else {
			this.label = '';
			this.color = 'white';
			this.links = [];
		}
	}
}

@Injectable()
class BookmarkGroupService {

	constructor(private http: HttpClient) {
	}

	public create(tag: string, data: BookmarkGroup): Observable<BookmarkGroup> {
		return this.http.post<BookmarkGroup>(`http://localhost:8080/api/tags/${tag}/groups`, data);
	}

	public update(tag: string, data: BookmarkGroup): Observable<BookmarkGroup> {
		return this.http.put<BookmarkGroup>(`http://localhost:8080/api/tags/${tag}/groups/${data.id}`, data);
	}

	public delete(tag: string, data: BookmarkGroup): Observable<void> {
		return this.http.delete<void>(`http://localhost:8080/api/tags/${tag}/groups/${data.id}`);
	}
}

export { BookmarkGroupService, BookmarkGroup };
