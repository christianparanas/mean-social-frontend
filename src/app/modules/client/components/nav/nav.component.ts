import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  sidebarOpen = true;
  shortcutsArray: any = [
    {
      icon: "fal fa-flag",
      title: "Pages"
    },
    {
      icon: "fal fa-users",
      title: "Groups"
    },
    {
      icon: "fal fa-calendar",
      title: "Events"
    },
    {
      icon: "fal fa-virus",
      title: "COVID-19 Information Center"
    },
    {
      icon: "fal fa-briefcase",
      title: "Jobs"
    },
    {
      icon: "fal fa-clock",
      title: "Memories"
    },
    {
      icon: "fal fa-user",
      title: "Find friends"
    },
  ]

  @Input() currentRoute: string;

  constructor() {}

  ngOnInit(): void {}
}
