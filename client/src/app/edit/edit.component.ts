import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { BaseComponent } from '../base.component';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GroupDialogComponent } from '../group.dialog/group.dialog';
import { BookmarkGroupService, BookmarkGroup } from '../services/bookmark.group.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
class EditComponent extends BaseComponent implements OnInit {
	public loading: boolean;
	private tag: string;

	public bookmarkGroups: Array<BookmarkGroup> = [];

	constructor(
		private route: ActivatedRoute, private bookmarkService: BookmarkService,
		private bookmarkGroupService: BookmarkGroupService, private dialog: MatDialog) {
		super();
	}

	public ngOnInit(): void {
		this.loading = true;

		this.route.params.subscribe((params: Params) => {
			this.tag = params.tag;
			if (!this.tag) {
				this.tag = 'home';
			}

			this.cleanup.push(this.bookmarkService.getBookmarks(this.tag).subscribe((bookmarks: Array<BookmarkGroup>) => {
				this.bookmarkGroups = bookmarks;
				this.loading = false;
			}));
		});
	}

	public clickAdd(): void {
		const newGroup: BookmarkGroup = new BookmarkGroup();
		this.openGroupDialog(newGroup).afterClosed().subscribe((result: string) => {
			if (result === 'save') {
				this.bookmarkGroupService.create(this.tag, newGroup).subscribe((group: BookmarkGroup) => {
					this.bookmarkGroups.push(group);
				});
			}
		});
	}


	private openGroupDialog(group: BookmarkGroup): MatDialogRef<GroupDialogComponent> {
		return this.dialog.open(GroupDialogComponent, {
			width: '400px',
			data: { group }
		});
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
