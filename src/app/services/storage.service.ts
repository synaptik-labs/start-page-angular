import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
class StorageService {
	constructor() {}

	public get(key: string): Observable<any> {
		const result: any = window.localStorage.getItem(key);
		return of(result);
	}

	public set(key: string, data: any): Observable<void> {
		window.localStorage.setItem(key, data);
		return of();
	}
}

export { StorageService };
