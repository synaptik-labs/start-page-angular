import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './topbar/topbar.component';

import { BookmarkService } from './services/bookmark.service';
import { StorageService } from './services/storage.service';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		BookmarksComponent,
		TopbarComponent
	],
	imports: [
		MatButtonModule,
		MatIconModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule
	],
	providers: [
		BookmarkService,
		StorageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
