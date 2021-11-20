import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { FormsModule } from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// import custom module/s
import { PrimengModule } from '../primeng/primeng.module'
import { CoreModule } from '../../core/core.module'

// pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { AccountComponent } from './pages/account/account.component';
import { PostcontainerComponent } from './components/postcontainer/postcontainer.component';
import { FriendsComponent } from './pages/friends/friends.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    NotificationsComponent,
    AccountComponent,
    PostcontainerComponent,
    FriendsComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    PrimengModule,
    CoreModule,
    BrowserAnimationsModule
  ]
})
export class ClientModule { }
