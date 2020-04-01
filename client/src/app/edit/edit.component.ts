import { Component, OnInit } from '@angular/core';
import { BookmarkGroup, BookmarkService } from '../services/bookmark.service';
import { BaseComponent } from '../base.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
class EditComponent extends BaseComponent implements OnInit {
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

	public clickAdd(): void {
		this.bookmarkGroups.push(new BookmarkGroup());
	}

	public doRemoveGroup(group: BookmarkGroup): void {
		for (let i: number = 0; i < this.bookmarkGroups.length; i ++) {
			if (this.bookmarkGroups[i].label === group.label) {
				this.bookmarkGroups.splice(i, 1);
				break;
			}
		}
	}
}

export { EditComponent };
