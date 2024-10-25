import { Injectable } from '@angular/core';
import { Seance } from '../model/seance.model';
import { WeekCreateComponent } from '../week/week-create/week-create.component';

@Injectable({
  providedIn: 'root',
})
export class SeanceService {
  newSeance: any = [];
  seances: Seance[] = [];
  seancesTemp: any = [];
  constructor() {

  }

  getSeances(): Seance[] {
    this.setApiSeances();
    return this.seances;
  }

  getSeancesById(id: String): Seance[] {
    this.setApiSeances();
    const seances = this.seances.filter((seance: Seance) => String(seance.id) === String(id));
    return seances;
  }

  getSeancesByWeekId(id: String): Seance[] {
    this.setApiSeances();
    const seances = this.seances.filter((seance: Seance) => String(seance.weekId) === String(id));
    return seances;
  }

  setApiSeances() {
    const newSeances = [];
    for (const seance of this.seancesTemp) {
      newSeances.push({
        id: seance._id,
        weekId: seance.weekId,
        username: seance.username,
        numofSeance: seance.numofSeance,
        benchSerie: seance.benchSerie,
        benchRep: seance.benchRep,
        benchPoids: seance.benchPoids,
        benchRpe: seance.benchRpe,
        benchType: seance.benchType,
        benchBackoffSerie: seance.benchBackoffSerie,
        benchBackoffRep: seance.benchBackoffRep,
        benchBackoffPoids: seance.benchBackoffPoids,
        benchBackoffRpe: seance.benchBackoffRpe,
        benchBackoffType: seance.benchBackoffType,
        squatSerie: seance.squatSerie,
        squatRep: seance.squatRep,
        squatPoids: seance.squatPoids,
        squatRpe: seance.squatRpe,
        squatType: seance.squatType,
        squatBackoffSerie: seance.squatBackoffSerie,
        squatBackoffRep: seance.squatBackoffRep,
        squatBackoffPoids: seance.squatBackoffPoids,
        squatBackoffRpe: seance.squatBackoffRpe,
        squatBackoffType: seance.squatBackoffType,
        deadliftSerie: seance.deadliftSerie,
        deadliftRep: seance.deadliftRep,
        deadliftPoids: seance.deadliftBackoffPoids,
        deadliftRpe: seance.deadliftRpe,
        deadliftType: seance.deadliftType,
        deadliftBackoffSerie: seance.deadliftBackoffSerie,
        deadliftBackoffRep: seance.deadliftBackoffRep,
        deadliftBackoffPoids: seance.deadliftBackoffPoids,
        deadliftBackoffRpe: seance.deadliftBackoffRpe,
        deadliftBackoffType: seance.deadliftBackoffType,
        renfo: seance.renfo,
        commentaire: seance.commentaire
      });
    }
    this.seances = newSeances;
  }
}
