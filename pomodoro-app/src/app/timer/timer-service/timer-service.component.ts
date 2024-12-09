import { Injectable, signal } from '@angular/core';
import { Time } from '../time.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timeLeft!: number;

  sessionNumber!: number;
  sessionTime!: number;
  breakTime!: number;

  currentTime = signal<Time>({ minutes: 0, seconds: 0 });
  isBreakTime = signal(false);

  private intervalId: any;
  private isRunning = signal(false);

  startTimer(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);

    this.intervalId = setInterval(() => {
      if (this.timeLeft <= 0) {
        this.scheduleNextPomodoroPhase();
        return;
      }

      this.timeLeft -= 1;
      this.currentTime.set({
        minutes: Math.floor(this.timeLeft / 60),
        seconds: this.timeLeft % 60,
      });
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

    if (this.isBreakTime()) {
      this.timeLeft = this.breakTime * 60;
      return;
    }

    this.timeLeft = this.sessionTime * 60;
  }

  isTimerRunning(): boolean {
    return this.isRunning();
  }

  private scheduleNextPomodoroPhase(): void {
    if (this.sessionNumber === 0) {
      this.resetTimer();
    }

    if (!this.isBreakTime()) {
      // It's not the final session, so we need to start a break
      if (this.sessionNumber > 1) {
        this.isBreakTime.set(true);
        this.timeLeft = this.breakTime * 60;
      }

      this.sessionNumber -= 1;
    } else {
      this.isBreakTime.set(false);
      this.timeLeft = this.sessionTime * 60;
    }
  }
}
