import { Component, OnInit, Input } from '@angular/core';
import { BookmarkGroup } from '../services/bookmark.service';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
	styleUrls: ['./bookmarks.component.css']
})
class BookmarksComponent implements OnInit {
	@Input()
	public bookmarks: BookmarkGroup;

	constructor() {}

	public ngOnInit(): void {
	}
}

export { BookmarksComponent };
