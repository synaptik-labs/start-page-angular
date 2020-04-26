import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookmarkLink } from './bookmark.link.service';
import { environment } from '../../environments/environment';

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
		return this.http.post<BookmarkGroup>(`${environment.apiUrl}/tags/${tag}/groups`, data);
	}

	public update(tag: string, data: BookmarkGroup): Observable<BookmarkGroup> {
		return this.http.put<BookmarkGroup>(`${environment.apiUrl}/tags/${tag}/groups/${data.id}`, data);
	}

	public delete(tag: string, data: BookmarkGroup): Observable<void> {
		return this.http.delete<void>(`${environment.apiUrl}/tags/${tag}/groups/${data.id}`);
	}
}

export { BookmarkGroupService, BookmarkGroup };
