import { Injectable } from '@angular/core';
import { Seance } from '../model/seance.model';

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

  setApiSeances() {
    const newSeances = [];
    for (const seance of this.seancesTemp) {
      newSeances.push({
        id: seance.id,
        weekId: seance.weekId,
        username: seance.username,
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
