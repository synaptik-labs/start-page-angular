import { Component, OnInit } from '@angular/core';
import { BookmarkGroup, BookmarkService } from '../services/bookmark.service';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
class EditComponent extends BaseComponent implements OnInit {
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

	public clickAdd(): void {
		this.bookmarkGroups.push(new BookmarkGroup());
	}
}

export { EditComponent };
