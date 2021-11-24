import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData = () => {
    this.profileService.getProfileData().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
