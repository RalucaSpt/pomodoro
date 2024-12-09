import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timeLeft = 25 * 60;
  minutes = signal(Math.floor(this.timeLeft / 60));
  seconds = signal(this.timeLeft % 60);

  private intervalId: any;
  private isRunning = signal(false);

  startTimer(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);

    this.intervalId = setInterval(() => {
      if (this.timeLeft <= 0) {
        this.stopTimer();
        return;
      }

      this.timeLeft -= 1;
      this.minutes.set(Math.floor(this.timeLeft / 60));
      this.seconds.set(this.timeLeft % 60);
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.isRunning.set(false);
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.timeLeft = 25 * 60;
    this.minutes.set(Math.floor(this.timeLeft / 60));
    this.seconds.set(this.timeLeft % 60);
  }

  isTimerRunning(): boolean {
    return this.isRunning();
  }
}
