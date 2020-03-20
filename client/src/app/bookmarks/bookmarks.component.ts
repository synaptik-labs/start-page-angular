import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookmarkGroup, BookmarkLink } from '../services/bookmark.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LinkDialogComponent } from '../link.dialog/link.dialog';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
	styleUrls: ['./bookmarks.component.scss']
})
class BookmarksComponent implements OnInit {
	@Input() @Output()
	public bookmarkGroup: BookmarkGroup;

	@Input()
	public editing: boolean;

	@Output()
	public removeGroup: EventEmitter<BookmarkGroup> = new EventEmitter<BookmarkGroup>();

	public readonly colors: Array<string> = ['red', 'green', 'blue', 'purple', 'cyan', 'yellow', 'white'];

	constructor(private dialog: MatDialog) {}

	public ngOnInit(): void {
	}

	public doSubmit($event: Event): void {
		$event.preventDefault();
	}

	public clickRemoveGroup(): void {
		this.removeGroup.emit(this.bookmarkGroup);
	}

	public clickAddLink(): void {
		const newLink: BookmarkLink = new BookmarkLink();
		this.openLinkDialog(newLink).afterClosed().subscribe((result: string) => {
			if (result === 'save') {
				this.bookmarkGroup.links.push(newLink);
			}
		});
	}

	public clickEditLink(link: BookmarkLink): void {
		this.openLinkDialog(link);
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
				this.bookmarkGroup.links.splice(i, 1);
				break;
			}
		}
	}
}

export { BookmarksComponent };
