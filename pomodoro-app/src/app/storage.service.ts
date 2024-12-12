import { Injectable, signal } from '@angular/core';
import { Week } from './weekstats/week.model';
import { indexToDay } from './weekstats/week.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storageKey = 'pomodoro-timer';

  timeSpentLearningEachDayThisWeek = signal<Week>({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    });

  constructor() {
    this.initStorage();
    this.updateSignal();
  }

  private initStorage() {
    if (this.loadTimerData() === null) {
      let storedData = {
        lastUpdated: new Date().getTime(),
        minutesEachDay: this.createEmptyWeek(),
      };

      localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    }
  }

  saveTimerData(minutes: number): void {
   const storedData = this.loadTimerData();
   const dayIndex: number = new Date().getDay();
   const currentTime = new Date().getTime();

   if(currentTime - storedData.lastUpdated > 86400000) {
     storedData.minutesEachDay = this.createEmptyWeek();
     storedData.lastUpdated = currentTime;
   }

    const day = indexToDay[dayIndex].toLowerCase();

    storedData.minutesEachDay[day] += minutes;

    localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    this.updateSignal();
  }

  loadTimerData(): any {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearTimerData(): void {
    localStorage.removeItem(this.storageKey);
  }

  updateSignal(): void {
    const storedData = this.loadTimerData();
    this.timeSpentLearningEachDayThisWeek.set(storedData.minutesEachDay);
  }

  createEmptyWeek(): Week {
    return {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
    };
  }
} 

