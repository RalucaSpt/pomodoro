import { Component, computed, inject } from '@angular/core';
import { TimerService } from './timer-service/timer-service.component';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [DecimalPipe, CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  private timerService = inject(TimerService);

  currentTime = this.timerService.currentTime;
  sessionNumber = this.timerService.sessionNumber;
  isBreakTime = this.timerService.isBreakTime;

  startTimer(): void {
    this.timerService.startTimer();
  }

  stopTimer(): void {
    this.timerService.stopTimer();
  }

  resetTimer(): void {
    this.timerService.resetTimer();
  }

  isRunning(): boolean {
    return this.timerService.isTimerRunning();
  }
}
