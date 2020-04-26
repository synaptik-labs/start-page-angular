import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookmarkGroup } from './bookmark.group.service';
import { environment } from '../../environments/environment';

@Injectable()
class BookmarkService {
	constructor(private http: HttpClient) {
	}

	public getBookmarks(tag: string): Observable<Array<BookmarkGroup>> {
		return this.http.get<Array<BookmarkGroup>>(`${environment.apiUrl}/tags/${tag}`);
	}
}

export { BookmarkService };
