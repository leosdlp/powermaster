import { Component, OnInit } from '@angular/core';
import { Seance } from '../../model/seance.model';
import { ApiUrlService } from '../../service/api-url.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SeanceService } from '../../service/seance.service';
import { AdminAuthService } from '../../service/admin-auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seance-update',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule,FormsModule, HttpClientModule],
  templateUrl: './seance-update.component.html',
  styleUrl: './seance-update.component.css'
})
export class SeanceUpdateComponent implements OnInit{
  seance: Seance[] = [];
  [key: string]: any;
  numofSeance: any = 0;
  seanceForm!: FormGroup;
  username: any = "";
  weekId: any = 0;
  seancesTemp: any = [];
  benchSerie: number = 0;
  benchRep: number = 0;
  benchRpe: number = 0;
  benchPoids: number = 0;
  benchPr: number = 0;
  benchType: String = "tag";
  benchBackoffSerie: number = 0;
  benchBackoffRep: number = 0;
  benchBackoffRpe: number = 0;
  benchBackoffPoids: number = 0;
  benchBackoffType: String = "tag";
  squatSerie: number = 0;
  squatRep: number = 0;
  squatRpe: number = 0;
  squatPoids: number = 0;
  squatPr: number = 0;
  squatType: String = "tag";
  squatBackoffSerie: number = 0;
  squatBackoffRep: number = 0;
  squatBackoffRpe: number = 0;
  squatBackoffPoids: number = 0;
  squatBackoffType: String = "tag";
  deadliftSerie: number = 0;
  deadliftRep: number = 0;
  deadliftRpe: number = 0;
  deadliftPoids: number = 0;
  deadliftPr: number = 0;
  deadliftType: String = "tag";
  deadliftBackoffSerie: number = 0;
  deadliftBackoffRep: number = 0;
  deadliftBackoffRpe: number = 0;
  deadliftBackoffPoids: number = 0;
  deadliftBackoffType: String = "tag";
  renfo: String = "pec-triceps";
  commentaire: String = "";
  rpeForRep: any = {
    10: {"1": 100, "2": 95, "3": 91, "4": 87, "5": 85, "6": 83, "7": 81, "8": 79},
    9.5: {"1": 97, "2": 93, "3": 89, "4": 86, "5": 84, "6": 82, "7": 80, "8": 77.5},
    9: {"1": 95, "2": 91, "3": 87, "4": 85, "5": 83, "6": 81, "7": 79, "8": 76},
    8.5: {"1": 93, "2": 89, "3": 86, "4": 84, "5": 82, "6": 80, "7": 77.5, "8": 74.5},
    8: {"1": 91, "2": 87, "3": 85, "4": 83, "5": 81, "6": 79, "7": 76, "8": 73},
    7.5: {"1": 89, "2": 86, "3": 84, "4": 82, "5": 80, "6": 77.5, "7": 74.5, "8": 71.5},
    7: {"1": 87, "2": 85, "3": 83, "4": 81, "5": 79, "6": 76, "7": 73, "8": 70}
  }
  exerciceTypePourcentage = {
    "tag": 1,
    "larsen": 0.923,
    "tempo-3-1-0": 0.923,
    "tempo-4-2-4": 0.903,
    "1ct": 0.962,
    "2ct": 0.942,
    "3ct": 0.923,
    "4ct": 0.903,
    "5ct": 0.885,
    "alt": 0.958
  };
  constructor(private fb: FormBuilder, private http: HttpClient, private apiUrlService: ApiUrlService, private seanceService: SeanceService, private authService: AdminAuthService, private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    this['seanceId'] = this.getIdFromUrl();
    this.seance = this.seanceService.getSeancesById(this['seanceId']);
    this.seanceForm = this.fb.group({
      benchSerie: [''],
      benchRep: [''],
      benchPoids: [''],
      benchRpe: [''],
      benchType: [''],
      benchBackoffSerie: [''],
      benchBackoffRep: [''],
      benchBackoffPoids: [''],
      benchBackoffRpe: [''],
      benchBackoffType: [''],
      squatSerie: [''],
      squatRep: [''],
      squatPoids: [''],
      squatRpe: [''],
      squatType: [''],
      squatBackoffSerie: [''],
      squatBackoffRep: [''],
      squatBackoffPoids: [''],
      squatBackoffRpe: [''],
      squatBackoffType: [''],
      deadliftSerie: [''],
      deadliftRep: [''],
      deadliftPoids: [''],
      deadliftRpe: [''],
      deadliftType: [''],
      deadliftBackoffSerie: [''],
      deadliftBackoffRep: [''],
      deadliftBackoffPoids: [''],
      deadliftBackoffRpe: [''],
      deadliftBackoffType: [''],
      renfo: [''],
      commentaire: ['']
    });
    this.benchPr = this.authService.getUserPr("bench");
    this.squatPr = this.authService.getUserPr("squat");
    this.deadliftPr = this.authService.getUserPr("deadlift");
    this.numofSeance = this.seance[0].numofSeance;
    this.weekId = this.seance[0].weekId;
    this.benchSerie = this.seance[0].benchSerie;
    this.benchRep = this.seance[0].benchRep;
    this.benchRpe = this.seance[0].benchRpe;
    this.benchPoids = this.seance[0].benchPoids;
    this.benchType = this.seance[0].benchType;
    this.benchBackoffSerie = this.seance[0].benchBackoffSerie;
    this.benchBackoffRep = this.seance[0].benchBackoffRep;
    this.benchBackoffRpe = this.seance[0].benchBackoffRpe;
    this.benchBackoffPoids = this.seance[0].benchBackoffPoids;
    this.benchBackoffType = this.seance[0].benchBackoffType;
    this.squatSerie = this.seance[0].squatSerie;
    this.squatRep = this.seance[0].squatRep;
    this.squatRpe = this.seance[0].squatRpe;
    this.squatPoids = this.seance[0].squatPoids;
    this.squatType = this.seance[0].squatType;
    this.squatBackoffSerie = this.seance[0].squatBackoffSerie;
    this.squatBackoffRep = this.seance[0].squatBackoffRep;
    this.squatBackoffRpe = this.seance[0].squatBackoffRpe;
    this.squatBackoffPoids = this.seance[0].squatBackoffPoids;
    this.squatBackoffType = this.seance[0].squatBackoffType;
    this.deadliftSerie = this.seance[0].deadliftSerie;
    this.deadliftRep = this.seance[0].deadliftRep;
    this.deadliftRpe = this.seance[0].deadliftRpe;
    this.deadliftPoids = this.seance[0].deadliftPoids;
    this.deadliftType = this.seance[0].deadliftType;
    this.deadliftBackoffSerie = this.seance[0].deadliftBackoffSerie;
    this.deadliftBackoffRep = this.seance[0].deadliftBackoffRep;
    this.deadliftBackoffRpe = this.seance[0].deadliftBackoffRpe;
    this.deadliftBackoffPoids = this.seance[0].deadliftBackoffPoids;
    this.deadliftBackoffType = this.seance[0].deadliftBackoffType;
    this.renfo = this.seance[0].renfo;
    this.commentaire = this.seance[0].commentaire;
    this.refreshSeances();
  }

  updateSeances() {
    if (!this.seanceForm.value.benchType || !this.seanceForm.value.benchBackoffType || !this.seanceForm.value.squatType || !this.seanceForm.value.squatBackoffType || !this.seanceForm.value.deadliftType || !this.seanceForm.value.deadliftBackoffType || !this.seanceForm.value.renfo) {
      alert('username, benchSerie, benchRep, benchPoids, benchRpe, benchType, benchBackoffSerie, benchBackoffRep, benchBackoffPoids, benchBackoffRpe, benchBackoffType, squatSerie, squatRep, squatPoids, squatRpe, squatType, squatBackoffSerie, squatBackoffRep, squatBackoffPoids, squatBackoffRpe, squatBackoffType, deadliftSerie, deadliftRep, deadliftPoids, deadliftRpe, deadliftType, deadliftBackoffSerie, deadliftBackoffRep, deadliftBackoffPoids, deadliftBackoffRpe, deadliftBackoffType and renfo are required');
      return;
    }
    const formData = new FormData();

    formData.append("id", String(this.seance[0].id));
    formData.append("username", this.seance[0].username);
    formData.append("weekId", String(this.seance[0].weekId));
    formData.append("numofSeance", String(this.seance[0].numofSeance));
    formData.append("benchSerie", this.seanceForm.value.benchSerie);
    formData.append("benchRep", this.seanceForm.value.benchRep);
    formData.append("benchPoids", this.seanceForm.value.benchPoids);
    formData.append("benchRpe", this.seanceForm.value.benchRpe);
    formData.append("benchType", this.seanceForm.value.benchType);
    formData.append("benchBackoffSerie", this.seanceForm.value.benchBackoffSerie);
    formData.append("benchBackoffRep", this.seanceForm.value.benchBackoffRep);
    formData.append("benchBackoffPoids", this.seanceForm.value.benchBackoffPoids);
    formData.append("benchBackoffRpe", this.seanceForm.value.benchBackoffRpe);
    formData.append("benchBackoffType", this.seanceForm.value.benchBackoffType);
    formData.append("squatSerie", this.seanceForm.value.squatSerie);
    formData.append("squatRep", this.seanceForm.value.squatRep);
    formData.append("squatPoids", this.seanceForm.value.squatPoids);
    formData.append("squatRpe", this.seanceForm.value.squatRpe);
    formData.append("squatType", this.seanceForm.value.squatType);
    formData.append("squatBackoffSerie", this.seanceForm.value.squatBackoffSerie);
    formData.append("squatBackoffRep", this.seanceForm.value.squatBackoffRep);
    formData.append("squatBackoffPoids", this.seanceForm.value.squatBackoffPoids);
    formData.append("squatBackoffRpe", this.seanceForm.value.squatBackoffRpe);
    formData.append("squatBackoffType", this.seanceForm.value.squatBackoffType);
    formData.append("deadliftSerie", this.seanceForm.value.deadliftSerie);
    formData.append("deadliftRep", this.seanceForm.value.deadliftRep);
    formData.append("deadliftPoids", this.seanceForm.value.deadliftBackoffPoids);
    formData.append("deadliftRpe", this.seanceForm.value.deadliftRpe);
    formData.append("deadliftType", this.seanceForm.value.deadliftType);
    formData.append("deadliftBackoffSerie", this.seanceForm.value.deadliftBackoffSerie);
    formData.append("deadliftBackoffRep", this.seanceForm.value.deadliftBackoffRep);
    formData.append("deadliftBackoffPoids", this.seanceForm.value.deadliftBackoffPoids);
    formData.append("deadliftBackoffRpe", this.seanceForm.value.deadliftBackoffRpe);
    formData.append("deadliftBackoffType", this.seanceForm.value.deadliftBackoffType);
    formData.append("renfo", this.seanceForm.value.renfo);
    formData.append("commentaire", this.seanceForm.value.commentaire);

    this.http.post(this.apiUrlService.APIUrl + 'UpdateSeances', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error adding fournisseur');
    });
    this.refreshSeances();
  }

  refreshPoids(exercice: string) {
    const exerciceType = exercice === "bench" || exercice === "benchBackoff" ? 'bench' : exercice === "squat" || exercice === "squatBackoff" ? 'squat': 'deadlift';

    if (exercice !== '') {
      const rep: number = this[`${exercice}Rep`];
      const rpe: number = this[`${exercice}Rpe`];

      type ExerciceTypeKey = keyof typeof this.exerciceTypePourcentage;
      const type = this[`${exercice}Type`] as ExerciceTypeKey;

      if (rpe !== 0 && rep !== 0 && type) {
        this[`${exercice}Poids`] = this.arrondirParMultipleDe2_5(
          this[`${exerciceType}Pr`] * this.rpeForRep[rpe][rep] * this.exerciceTypePourcentage[type] / 100
        );
      }
    }
  }

  arrondirParMultipleDe2_5(valeur: number): number {
    const multiple = 2.5;
    return Math.round(valeur / multiple) * multiple;
  }

  async modifierSeance() {
    await this.updateSeances();
    this.showWeek(this.weekId);
  }

  showWeek(id: number) {
    this.router.navigate(['/week-show', id]);
  }

  getIdFromUrl(): String {
    const id = String(this.route.snapshot.paramMap.get('id'));
    return id;
  }

  async refreshSeances() {
    this.http.get(this.apiUrlService.APIUrl + 'GetSeances').subscribe(data => {
      this.seanceService.seancesTemp = data;
      this.seancesTemp = data;
    });
    this.seanceService.setApiSeances();
    this.seanceService.getSeances();
  }
}
