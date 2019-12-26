import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

abstract class BaseComponent implements OnDestroy {
	protected cleanup: Array<Subscription> = [];

	constructor() {
	}

	public ngOnDestroy(): void {
		for (const sub of this.cleanup) {
			sub.unsubscribe();
		}
		this.cleanup.splice(0, this.cleanup.length);
	}
}

export { BaseComponent };
