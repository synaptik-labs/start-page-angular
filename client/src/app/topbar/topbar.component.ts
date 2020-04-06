import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BookmarkService } from '../services/bookmark.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
class TopbarComponent implements OnInit {
	public editing: boolean;

	private tag: string;

	constructor(
		private router: Router, private route: ActivatedRoute, private location: Location,
		private bookmarkService: BookmarkService) { }

	public ngOnInit(): void {
		this.editing = this.location.path(false) === '/edit';

		this.route.params.subscribe((params: Params) => {
			this.tag = params.tag;
			if (!this.tag) {
				this.tag = 'home';
			}
		});
	}

	public clickEdit(): void {
		this.router.navigate(['edit']);
		this.editing = true;
	}

	public clickDone(): void {
		this.router.navigate(['/']);
		this.editing = false;
	}
}

export { TopbarComponent };
