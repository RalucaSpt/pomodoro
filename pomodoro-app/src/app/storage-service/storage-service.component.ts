import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storageKey = 'pomodoro-timer';

  timeSpentLearningEachDayThisWeek = signal([0, 0, 0, 0, 0, 0, 0]);

  constructor() {
    this.initStorage();
    this.updateSignal();
  }

  private initStorage() {
    if (this.loadTimerData() === null) {
      let storedData = {
        lastUpdated: new Date().getTime(),
        minutesEachDay: [0, 0, 0, 0, 0, 0, 0],
      };

      localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    }
  }

  saveTimerData(minutes: number): void {
   const storedData = this.loadTimerData();
   const dayIndex = new Date().getDay();
   const currentTime = new Date().getTime();

   if(currentTime - storedData.lastUpdated > 86400000) {
     storedData.minutesEachDay = [0, 0, 0, 0, 0, 0, 0];
     storedData.lastUpdated = currentTime;
   }

    storedData.minutesEachDay[dayIndex-1] += minutes;

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
} 
