import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookmarkGroup } from '../services/bookmark.group.service';
import { BookmarkLink } from '../services/bookmark.link.service';

export interface DialogData {
	group: BookmarkGroup;
}

@Component({
	selector: 'app-group-dialog',
	templateUrl: 'group.dialog.html',
})
class GroupDialogComponent {
	public editing: boolean;
	public shadowGroup: BookmarkGroup;
	public readonly colors: Array<string> = ['red', 'green', 'blue', 'purple', 'cyan', 'yellow', 'white'];

	constructor(
		public dialogRef: MatDialogRef<GroupDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {
			this.shadowGroup = new BookmarkGroup(this.data.group);
			if (this.data.group.label) {
				this.editing = true;
			}
		}

	public onCancelClick(): void {
		this.dialogRef.close('cancel');
	}

	public onSaveClick(): void {
		this.data.group.color = this.shadowGroup.color;
		this.data.group.label = this.shadowGroup.label;
		this.data.group.links.splice(0, this.data.group.links.length);
		for (const link of this.shadowGroup.links) {
			this.data.group.links.push(new BookmarkLink(link));
		}

		this.dialogRef.close('save');
	}
}

export { GroupDialogComponent };
