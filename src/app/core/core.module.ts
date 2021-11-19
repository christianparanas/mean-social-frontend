import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';



@NgModule({
  declarations: [
    DarkModeToggleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DarkModeToggleComponent
  ]
})
export class CoreModule { }
