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
      label: 'Education',
      color: 'red',
      links: [
        { url: 'https://codeacademy.com', label: 'Code Academy'},
        { url: 'https://khanacademy.com', label: 'Khan Academy'},
        { url: 'https://udemy.com', label: 'Udemy'},
        { url: 'https://stackskills.com', label: 'Stack Skills'},
        { url: 'https://code.org', label: 'Code.org'},
        { url: 'https://codecombat.com', label: 'Code Combat'},
        { url: 'https://ocw.mit.edu/courses/find-by-topic/#cat=engineer&subcat=computerscience', label: 'MIT OCW'}
      ]
    },
    {
      label: 'Coding',
      color: 'yellow',
      links: [
        { url: 'https://bitbucket.com', label: 'BitBucket'},
        { url: 'https://github.com', label: 'GitHub'},
        { url: 'https://stackoverflow.com', label: 'StackOverflow'},
        { url: 'https://hackerrank.com', label: 'Hacker Rank'},
        { url: 'https://codewars.com', label: 'Code Wars'},
      ]
    },
    {
      label: 'Videos',
      color: 'purple',
      links: [
        { url: 'https://youtube.com', label: 'YouTube'},
        { url: 'https://10.0.0.255:32400/web', label: 'Plex'},
        { url: 'https://netflix.com', label: 'Netflix'},
        { url: 'https://hulu.com', label: 'Hulu'},
        { url: 'https://play.hbonow.com', label: 'HBO Now'}
      ]
    },
    {
      label: 'Local',
      color: 'cyan',
      links: [
        { url: 'http://10.0.0.1', label: 'Router'},
        { url: 'http://10.0.0.2', label: 'Unraid'},
        { url: 'http://10.0.0.200', label: 'TT-RSS'},
        { url: 'http://10.0.0.254:8181', label: 'Tautalli'},
        { url: 'http://10.0.0.141', label: 'Wordpress #1'},
        { url: 'http://10.0.0.142', label: 'Wordpress #2'},
        { url: 'http://10.0.0.201:8080', label: 'Jenkins'},
        { url: 'http://10.0.0.120:2202', label: 'Ubooquity'},
        { url: 'http://10.0.0.4/admin', label: 'PiHole'},
      ]
    },
    {
      label: 'Random',
      color: 'white',
      links: [
        { url: 'https://gmail.com', label: 'Gmail'},
        { url: 'http://weather.cod.edu/satrad/exper', label: 'GOES-16'},
        { url: 'https://weather.com', label: 'Weather.com'},
        { url: 'https://www.wunderground.com/wundermap', label: 'Wundermap'},
      ]
    },
    {
      label: 'Social Media',
      color: 'blue',
      links: [
        { url: 'https://reddit.com/', label: 'Reddit'},
        { url: 'https://twitter.com/', label: 'Twitter'},
        { url: 'https://news.ycombinator.com/', label: 'Hacker News'},
      ]
    },
    {
      label: 'Chat',
      color: 'yellow',
      links: [
        { url: 'https://hangouts.google.com/', label: 'Hangouts'},
        { url: 'https://web.whatsapp.com/', label: 'WhatsApp'},
      ]
    },
    {
      label: 'Blogs',
      color: 'green',
      links: [
        { url: 'https://synaptiklabs.com', label: 'Synaptik Labs'},
        { url: 'https://wilwheaton.net', label: 'Wil Wheaton'},
        { url: 'https://techcrunch.com', label: 'TechCrunch'},
        { url: 'https://hackernoon.com', label: 'HackerNoon'},
      ]
    }
  ];
}
