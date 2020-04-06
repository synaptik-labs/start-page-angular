import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { BaseComponent } from '../base.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BookmarkGroup } from '../services/bookmark.group.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
class HomeComponent extends BaseComponent implements OnInit {
	public loading: boolean;

	public bookmarkGroups: Array<BookmarkGroup> = [];

	constructor(private route: ActivatedRoute, private bookmarkService: BookmarkService) {
		super();
	}

	public ngOnInit(): void {
		this.loading = true;

		this.route.params.subscribe((params: Params) => {
			let tag: string = params.tag;
			if (!tag) {
				tag = 'home';
			}

			this.cleanup.push(this.bookmarkService.getBookmarks(tag).subscribe((bookmarks: Array<BookmarkGroup>) => {
				this.bookmarkGroups = bookmarks;
				this.loading = false;
			}));
		});
	}

}

export { HomeComponent };
