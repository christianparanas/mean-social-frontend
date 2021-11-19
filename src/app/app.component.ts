import { Component } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkMode$ = this.darkModeService.darkMode$;
  
  constructor(private darkModeService: DarkModeService) {}
}
