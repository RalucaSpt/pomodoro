import { inject, Injectable, signal } from '@angular/core';
import { Time } from './time.model';
import {
  DEFAULT_SESSION_TIME,
  DEFAULT_BREAK_TIME,
  DEFAULT_SESSION_NUMBER,
} from './time.model';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  sessionNumber = signal(DEFAULT_SESSION_NUMBER);
  sessionTime: number = DEFAULT_SESSION_TIME;
  breakTime: number = DEFAULT_BREAK_TIME;
  timeLeft = this.sessionTime * 60;

  currentTime = signal<Time>({ minutes: this.sessionTime, seconds: 0 });

  isBreakTime = signal(false);
  isRunning = signal(false);

  private intervalId: any;
  private storageService = inject(StorageService);
  

  startTimer(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);

    if (this.sessionNumber() === 0) this.sessionNumber.set(1);

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
    } else {
      this.timeLeft = this.sessionTime * 60;
    }

    this.currentTime.set({
      minutes: Math.floor(this.timeLeft / 60),
      seconds: this.timeLeft % 60,
    });
  }

  isTimerRunning(): boolean {
    return this.isRunning();
  }

  private scheduleNextPomodoroPhase(): void {
    if (this.sessionNumber() === 0) {
      this.resetTimer();
      return;
    }

    if (!this.isBreakTime()) {
      // It's not the final session, so we need to start a break
      if (this.sessionNumber() > 1) {
        this.isBreakTime.set(true);
        this.timeLeft = this.breakTime * 60;
      }

      this.sessionNumber.set(this.sessionNumber() - 1);
      this.storageService.saveTimerData(this.sessionTime);
    } else {
      this.isBreakTime.set(false);
      this.timeLeft = this.sessionTime * 60;
    }
  }

  updateSettings(sessionNumber: number, sessionTime: number, breakTime: number): void {
    this.sessionNumber.set(sessionNumber);
    this.sessionTime = sessionTime;
    this.breakTime = breakTime;
    this.timeLeft = sessionTime * 60;

    this.currentTime.set({
      minutes: sessionTime,
      seconds: 0,
    });

    this.isBreakTime.set(false);
  }
}
