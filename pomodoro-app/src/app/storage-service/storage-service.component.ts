import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-storage-service',
  imports: [],
  templateUrl: './storage-service.component.html',
  styleUrl: './storage-service.component.css',
})
@Injectable({ providedIn: 'root' })
export class StorageServiceComponent {
  private storageKey = 'pomodoro-timer';

  saveTimerData(minutes: number, seconds: number): void {
    const timerData = {
      minutes,
      seconds,
      date: new Date().toLocaleDateString(),
    };

    let storedData = this.loadTimerData();
    if (storedData) {
      storedData.push(timerData);
    } else {
      storedData = [timerData];
    }

    localStorage.setItem(this.storageKey, JSON.stringify(storedData));
  }

  loadTimerData(): { minutes: number; seconds: number; date: string }[] | null {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearTimerData(): void {
    localStorage.removeItem(this.storageKey);
  }

  getTotalTimeForToday(): number {
    const storedData = this.loadTimerData();
    const today = new Date().toLocaleDateString();
    if (storedData) {
      const todayData = storedData.filter((item) => item.date === today);
      return todayData.reduce(
        (total, item) => total + item.minutes * 60 + item.seconds,
        0
      );
    }
    return 0;
  }
}
