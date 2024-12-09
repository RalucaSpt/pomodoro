import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from "./timer/timer.component";
import { ConfigComponent } from "./config/config.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerComponent, ConfigComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pomodoro-app';
}
