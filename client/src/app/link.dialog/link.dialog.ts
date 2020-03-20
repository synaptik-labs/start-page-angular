import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookmarkLink } from '../services/bookmark.service';

export interface DialogData {
	link: BookmarkLink;
}

@Component({
	selector: 'app-link-dialog',
	templateUrl: 'link.dialog.html',
})
class LinkDialogComponent {
	public editing: boolean;
	public shadowLink: BookmarkLink;

	constructor(
		public dialogRef: MatDialogRef<LinkDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {
			this.shadowLink = new BookmarkLink(this.data.link);
			if (this.data.link.label) {
				this.editing = true;
			}
		}

	public onCancelClick(): void {
		this.dialogRef.close('cancel');
	}

	public onSaveClick(): void {
		if (
			this.shadowLink.url.indexOf('http://') !== 0 &&
			this.shadowLink.url.indexOf('https://') !== 0) {
			this.shadowLink.url = 'https://' + this.shadowLink.url;
		}

		if (!this.shadowLink.icon || this.shadowLink.icon.length === 0) {
			this.shadowLink.icon = this.shadowLink.url + '/favicon.ico';
		}

		this.data.link.url = this.shadowLink.url;
		this.data.link.label = this.shadowLink.label;
		this.data.link.icon = this.shadowLink.icon;

		this.dialogRef.close('save');
	}
}

export { LinkDialogComponent };
