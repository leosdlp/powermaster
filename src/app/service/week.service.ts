import { Injectable } from '@angular/core';
import { Week } from '../model/week.model';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  newWeek: any = [];
  weeks: Week[] = [];
  weeksTemp: any = [];
  selectedWeekId: any = 0;

  constructor() { }

  getWeeks(): Week[] {
    this.setApiWeeks();
    return this.weeks;
  }

  getWeekById(id: String): Week[] {
    this.setApiWeeks();
    const weeks = this.weeks.filter((week: Week) => String(week.id) === id);
    return weeks;
  }

  getWeekByUserId(id: String): Week[] {
    this.setApiWeeks();
    const weeks = this.weeks.filter((week: Week) => String(week.username) === id);
    return weeks;
  }

  setApiWeeks() {
    const newWeeks = [];
    for (const week of this.weeksTemp) {
      newWeeks.push({
        id: week._id,
        username: week.username,
        nbSeances: week.nbSeances,
        dateDebut: week.dateDebut,
      });
    }
    this.weeks = newWeeks;
  }

  setSelectedWeekId(id: number) {
    this.selectedWeekId = id;
  }

  getSelectedWeekId() {
    return this.selectedWeekId;
  }
}
