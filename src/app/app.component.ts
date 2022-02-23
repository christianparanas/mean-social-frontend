import { Component } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

import { EventsService } from './modules/client/shared/services/events.service';
import { ProfileService } from './modules/client/shared/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  darkMode$ = this.darkModeService.darkMode$;
  profileData: any;

  constructor(
    private darkModeService: DarkModeService,
    private profileService: ProfileService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.loadProfileData();
  }

  loadProfileData = () => {
    this.profileService.getProfileData().subscribe(
      (response: any) => {
        this.profileData = (({ posts, ...o }) => o)(response);

        this.eventsService.sendUserOnlineIndicator(this.profileData.id);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
