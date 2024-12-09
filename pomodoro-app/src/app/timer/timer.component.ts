import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  minutes: number = 0;
  seconds: number = 0;

  startTimer() {}

  stopTimer() {}

  resetTimer() {}
}
