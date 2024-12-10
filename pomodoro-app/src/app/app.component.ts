import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from "./timer/timer.component";
import { ConfigComponent } from "./config/config.component";
import { WeekstatsComponent } from './weekstats/weekstats.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerComponent, ConfigComponent, WeekstatsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pomodoro-app';
}
