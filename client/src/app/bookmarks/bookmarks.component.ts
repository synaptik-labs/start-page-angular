import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LinkDialogComponent } from '../link.dialog/link.dialog';
import { BookmarkGroup, BookmarkGroupService } from '../services/bookmark.group.service';
import { BookmarkLink, BookmarkLinkService } from '../services/bookmark.link.service';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
	styleUrls: ['./bookmarks.component.scss']
})
class BookmarksComponent extends BaseComponent implements OnInit {
	@Input() @Output()
	public bookmarkGroup: BookmarkGroup;

	@Input()
	public editing: boolean;

	@Output()
	public removeGroup: EventEmitter<BookmarkGroup> = new EventEmitter<BookmarkGroup>();

	public readonly colors: Array<string> = ['red', 'green', 'blue', 'purple', 'cyan', 'yellow', 'white'];

	constructor(
		private dialog: MatDialog,
		private bookmarkGroupService: BookmarkGroupService,
		private bookmarkLinkService: BookmarkLinkService) {
		super();
	}

	public ngOnInit(): void {
	}

	public doSubmit($event: Event): void {
		$event.preventDefault();
	}

	public clickRemoveGroup(): void {
		this.cleanup.push(this.bookmarkGroupService.delete(this.bookmarkGroup.tag, this.bookmarkGroup).subscribe(() => {
			this.removeGroup.emit(this.bookmarkGroup);
		}));
	}

	public clickAddLink(): void {
		const newLink: BookmarkLink = new BookmarkLink();
		this.openLinkDialog(newLink).afterClosed().subscribe((result: string) => {
			if (result === 'save') {
				this.cleanup.push(this.bookmarkLinkService.create(this.bookmarkGroup, newLink).subscribe((linkResult: BookmarkLink) => {
					this.bookmarkGroup.links.push(linkResult);
				}));
			}
		});
	}

	public clickEditLink(link: BookmarkLink): void {
		this.openLinkDialog(link).afterClosed().subscribe((result: string) => {
			if (result === 'save') {
				console.log(`link updated: `, link);
				// this.bookmarkGroup.links.push(newLink);
			}
		});
	}

	private openLinkDialog(link: BookmarkLink): MatDialogRef<LinkDialogComponent> {
		return this.dialog.open(LinkDialogComponent, {
			width: '400px',
			data: { link }
		});
	}

	public clickRemoveLink(link: BookmarkLink): void {
		for (let i: number = 0; i < this.bookmarkGroup.links.length; i ++) {
			if (this.bookmarkGroup.links[i].url === link.url) {
				this.cleanup.push(this.bookmarkLinkService.delete(this.bookmarkGroup, link).subscribe(() => {
					this.bookmarkGroup.links.splice(i, 1);
				}));
				break;
			}
		}
	}
}

export { BookmarksComponent };
