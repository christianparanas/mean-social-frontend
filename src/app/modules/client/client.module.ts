import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import custom module/s
import { PrimengModule } from '../primeng/primeng.module';
import { CoreModule } from '../../core/core.module';

// components
import { NavComponent } from './components/nav/nav.component';
import { PostcontainerComponent } from './components/postcontainer/postcontainer.component';

// pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';

import { CreatepostComponent } from './components/createpost/createpost.component';
import { PostaudienceComponent } from './components/postaudience/postaudience.component';
import { MessagesComponent } from './pages/messages/messages.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    NotificationsComponent,
    PostcontainerComponent,
    FriendsComponent,
    ProfileComponent,
    CreatepostComponent,
    PostaudienceComponent,
    SearchComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
})
export class ClientModule {}
