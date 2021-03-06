import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'edit', component: EditComponent },
	{ path: ':tag', component: HomeComponent },
	{ path: ':tag/edit', component: EditComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
