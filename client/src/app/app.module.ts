import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './topbar/topbar.component';

import { BookmarkService } from './services/bookmark.service';
import { StorageService } from './services/storage.service';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { LinkDialogComponent } from './link.dialog/link.dialog';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		EditComponent,
		BookmarksComponent,
		TopbarComponent,
		LinkDialogComponent
	],
	imports: [
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatDialogModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule
	],
	providers: [
		BookmarkService,
		StorageService
	],
	entryComponents: [
		LinkDialogComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
