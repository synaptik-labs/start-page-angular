import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
class TopbarComponent implements OnInit {
	public editing: boolean;

	constructor(private router: Router, private location: Location) { }

	public ngOnInit(): void {
		this.editing = this.location.path(false) === '/edit';
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
