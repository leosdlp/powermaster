import { Injectable } from '@angular/core';
import { Week } from '../model/week.model';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  newWeek: any = [];
  weeks: Week[] = [];
  weeksTemp: any = [];

  constructor() { }

  getWeeks(): Week[] {
    this.setApiWeeks();
    return this.weeks;
  }

  setApiWeeks() {
    const newWeeks = [];
    for (const week of this.weeksTemp) {
      newWeeks.push({
        id: week.id,
        username: week.username,
        nbSeances: week.nbSeances,
        dateDebut: week.dateDebut,
      });
    }
    this.weeks = newWeeks;
  }
}
