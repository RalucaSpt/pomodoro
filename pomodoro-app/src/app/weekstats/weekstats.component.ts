import { Component, inject } from '@angular/core';
import { StorageService } from '../storage.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-weekstats',
  imports: [CommonModule, MatCardModule],
  templateUrl: './weekstats.component.html',
  styleUrl: './weekstats.component.css'
})
export class WeekstatsComponent {
  private storageService = inject(StorageService);
  timeSpentLearningEachDayThisWeek = this.storageService.timeSpentLearningEachDayThisWeek;
  
  transform(value: number): string {
    if(value > 0 && value/60 < 1) {
      return value + ' min';

    } else {
      return value/60 + ' h';
    }
 }
}
