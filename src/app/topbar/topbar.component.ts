import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
class TopbarComponent implements OnInit {

	constructor() { }

	public ngOnInit(): void {
	}

	public clickEdit(): void {
		console.log('edit clicked');
	}
}

export { TopbarComponent };