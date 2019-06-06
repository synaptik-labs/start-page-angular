import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'start-page';

  public bookmarkGroups: any = [
    {
      label: 'Coding',
      links: [
        { url: 'https://codeacademy.com', label: 'Code Academy'},
        { url: 'https://code.org', label: 'Code.org'}
      ]
    },
    {
      label: 'Blogs',
      links: [
        { url: 'https://synaptiklabs.com', label: 'Synaptik Labs'},
        { url: 'https://wilwheaton.net', label: 'Wil Wheaton'}
      ]
    }
  ];
}
