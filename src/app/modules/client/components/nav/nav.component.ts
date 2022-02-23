import { Component, OnInit, Input } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  sidebarOpen = false;
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
    {
      icon: "fal fa-virus",
      title: "COVID-19 Information Center"
    },
  ]

  @Input() currentRoute: string;

  constructor(private authService: AuthService,private toast: HotToastService, private router: Router,) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
    this.toast.info("Logged out!", { position: 'top-right' });
  }
}
