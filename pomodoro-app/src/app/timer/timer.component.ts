import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [DecimalPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  timeLeft: number = 25 * 60;
  minutes: number = this.timeLeft / 60;
  seconds: number = this.timeLeft % 60;

  private intervalId: any;
  private isRunning: boolean = false;

  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.seconds -= 1;
      if (this.seconds <= 0) {
        this.seconds = 59;
        this.minutes--;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.timeLeft = 25 * 60;
    this.minutes = this.timeLeft / 60;
    this.seconds = this.timeLeft % 60
  }
}
