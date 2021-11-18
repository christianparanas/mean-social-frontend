import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// custom module/s
import { ClientModule } from './modules/client/client.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
