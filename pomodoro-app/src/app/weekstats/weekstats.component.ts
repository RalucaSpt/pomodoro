import { Component, inject } from '@angular/core';
import { StorageService } from '../storage-service/storage-service.component';
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
}
