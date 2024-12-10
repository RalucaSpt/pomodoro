import { Component, inject, signal } from '@angular/core';
import { TimerService } from '../timer/timer-service/timer-service.component';
import { FormsModule } from '@angular/forms';
import {DEFAULT_SESSION_NUMBER, DEFAULT_SESSION_TIME, DEFAULT_BREAK_TIME} from '../timer/time.model';

@Component({
  selector: 'app-config',
  imports: [FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css',
})
export class ConfigComponent {
  timerService = inject(TimerService);
  isRunning = this.timerService.isRunning;

  sessionDurationInputValue: number = DEFAULT_SESSION_TIME;
  breakDurationInputValue: number = DEFAULT_BREAK_TIME;
  sessionNumberInputValue: number = DEFAULT_SESSION_NUMBER;

  inputWarning = signal("");

  constructor() {
  }

  validateInputs(): boolean {
    if(this.sessionDurationInputValue < 1 || this.sessionNumberInputValue < 1 || this.breakDurationInputValue < 1) {
      this.inputWarning.set("All values need to be larger than 0")
      return false;
    }

    if(!Number.isInteger(this.sessionDurationInputValue) || !Number.isInteger(this.sessionNumberInputValue) || !Number.isInteger(this.breakDurationInputValue)) {
      this.inputWarning.set("All values need to be integers")
      return false;
    }

    return true;
  }

  confirmSettings(): void { 
    if(!this.validateInputs()) return;

    this.timerService.updateSettings(this.sessionNumberInputValue, this.sessionDurationInputValue, this.breakDurationInputValue);
    this.inputWarning.set("");
  }
}
