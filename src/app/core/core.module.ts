import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// interceptor
import { TokenInterceptor } from './interceptors/token.interceptor';

// import components
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';

// import pipes
import { DateAgoPipe } from './pipes/date-ago.pipe';



@NgModule({
  declarations: [
    DarkModeToggleComponent,
    DateAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DarkModeToggleComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
