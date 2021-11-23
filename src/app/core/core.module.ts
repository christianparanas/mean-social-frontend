import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ]
})
export class CoreModule { }
