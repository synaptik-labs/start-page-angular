import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookmarkGroup } from './bookmark.group.service';
import { environment } from '../../environments/environment';

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

	public create(group: BookmarkGroup, data: BookmarkLink): Observable<BookmarkLink> {
		return this.http.post<BookmarkLink>(`${environment.apiUrl}/tags/${group.tag}/groups/${group.id}/links`, data);
	}

	public update(group: BookmarkGroup, data: BookmarkLink): Observable<BookmarkLink> {
		return this.http.put<BookmarkLink>(`${environment.apiUrl}/tags/${group.tag}/groups/${group.id}/links/${data.id}`, data);
	}

	public delete(group: BookmarkGroup, data: BookmarkLink): Observable<void> {
		return this.http.delete<void>(`${environment.apiUrl}/tags/${group.tag}/groups/${group.id}/links/${data.id}`);
	}
}

export { BookmarkLinkService, BookmarkLink };
