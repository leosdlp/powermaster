import { AdminAuthService } from '../../service/admin-auth.service';
import { Seance } from '../../model/seance.model';
import { Week } from '../../model/week.model';
import { ApiUrlService } from '../../service/api-url.service';
import { SeanceService } from '../../service/seance.service';
import { WeekService } from '../../service/week.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-week-show',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './week-show.component.html',
  styleUrl: './week-show.component.css'
})
export class WeekShowComponent {
  week: Week[] = [];
  seances: Seance[] = [];
  seancesToShow: (Seance | { hidden: boolean })[] = [];
  weeksTemp: any = [];
  seancesTemp: any = [];
  weekId: any = 0;
  nbSeances: number = 0;

  constructor(private apiUrlService: ApiUrlService, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router, private seanceService: SeanceService, private weekService: WeekService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.refreshWeeks();
    this.refreshSeances();
    this.weekId = this.getIdFromUrl();
    this.week = this.weekService.getWeekById(String(this.weekId));
    this.seances = this.seanceService.getSeancesByWeekId(String(this.weekId));
    if (this.week[0] && this.week[0].nbSeances) {
      this.nbSeances = this.week[0].nbSeances;
    }
    this.showSeancesWeek();
  }

  async refreshWeeks() {
    this.http.get(this.apiUrlService.APIUrl + 'GetWeeks').subscribe(data => {
      this.weekService.weeksTemp = data;
      this.weeksTemp = data;
    });
    this.weekService.setApiWeeks();
    this.weekService.getWeeks();
  }

  async refreshSeances() {
    this.http.get(this.apiUrlService.APIUrl + 'GetSeances').subscribe(data => {
      this.seanceService.seancesTemp = data;
      this.seancesTemp = data;
    });
    this.seanceService.setApiSeances();
    this.seanceService.getSeances();
  }

  getIdFromUrl(): String {
    const id = String(this.route.snapshot.paramMap.get('id'));
    return id;
  }

  showSeancesWeek() {
    this.seances.sort((a, b) => a.numofSeance - b.numofSeance);
    for (let i = 1; i <= this.nbSeances; i++) {
      let seanceToShow = this.seances.filter((seance: Seance) => String(seance.numofSeance) === String(i));
      if (seanceToShow.length > 0) {
        this.seancesToShow.push(...seanceToShow);
      } else {
        this.seancesToShow.push({"hidden": true});
      }
    }
  }

  isHiddenSeance(seance: Seance | { hidden: boolean }): seance is { hidden: boolean } {
    return (seance as { hidden: boolean }).hidden !== undefined;
  }

  createSeance(id: number) {
    this.router.navigate(['/seance-create',this.weekId, id]);
  }

  updateSeance(id: any) {
    this.router.navigate(['/seance-update', id]);
  }

  showSeance(id: any) {
    this.router.navigate(['/seance-show', id]);
  }

  deleteSeance(id: any) {
    this.http.delete(this.apiUrlService.APIUrl + 'DeleteSeances?id='+String(id)).subscribe(data=>{
      alert(data);
    })
    this.refreshWeeks();
    this.refreshSeances();
  }
}
