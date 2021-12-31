import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any = [];
  postsArr: any = new Array(3)

  constructor(private profileService: ProfileService,  private location: Location) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData = () => {
    this.profileService.getProfileData().subscribe(
      (response: any) => {
        this.profileData = (({ posts, ...o }) => o)(response)
        this.postsArr = response.posts

        console.log(this.profileData);
        console.log(this.postsArr);
      },
      (error) => {
        console.log(error);
        this.postsArr = null;
      }
    );
  };

  goBack() {
    this.location.back();
  }
}
