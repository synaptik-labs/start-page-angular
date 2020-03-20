import { Component, OnInit } from '@angular/core';
import { BookmarkGroup, BookmarkService } from '../services/bookmark.service';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
class HomeComponent extends BaseComponent implements OnInit {
	public loading: boolean;

	public bookmarkGroups: Array<BookmarkGroup> = [];

	constructor(private bookmarkService: BookmarkService) {
		super();
	}

	public ngOnInit(): void {
		this.loading = true;
		this.cleanup.push(this.bookmarkService.getBookmarks().subscribe((bookmarks: Array<BookmarkGroup>) => {
			this.bookmarkGroups = bookmarks;
			this.loading = false;
		}));
	}

}

export { HomeComponent };
