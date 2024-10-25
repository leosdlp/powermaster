import { AdminAuthService } from '../../service/admin-auth.service';
import { Seance } from '../../model/seance.model';
import { Week } from '../../model/week.model';
import { ApiUrlService } from '../../service/api-url.service';
import { SeanceService } from '../../service/seance.service';
import { WeekService } from '../../service/week.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-week-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './week-update.component.html',
  styleUrl: './week-update.component.css'
})
export class WeekUpdateComponent implements OnInit{
  weekForm!: FormGroup;
  weekId: any = '';
  nbSeances: any = 5;
  weeksTemp: any = [];
  dateDebut: any = '';
  week: Week[] = [];
  constructor(private apiUrlService: ApiUrlService, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router, private seanceService: SeanceService, private weekService: WeekService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.weekId = this.getIdFromUrl();
    this.weekForm = this.fb.group({
      nbSeances: [''],
      dateDebut: ['']
    });
    this.refreshWeeks();
    this.week = this.weekService.getWeekById(this.weekId);
    this.nbSeances = this.week[0].nbSeances;
    this.dateDebut = this.week[0].dateDebut;
  }

  getIdFromUrl(): String {
    const id = String(this.route.snapshot.paramMap.get('id'));
    return id;
  }

  async refreshWeeks() {
    this.http.get(this.apiUrlService.APIUrl + 'GetWeeks').subscribe(data => {
      this.weekService.weeksTemp = data;
      this.weeksTemp = data;
    });
    this.weekService.setApiWeeks();
    this.weekService.getWeeks();
  }

  modifierWeek() {
    this.updateWeeks();
  }

  updateWeeks() {
    if (!this.weekForm.value.nbSeances || !this.weekForm.value.dateDebut) {
      alert('nbSeances and dateDebut are required');
      return;
    }
    const formData = new FormData();

    formData.append("id", String(this.week[0].id));
    formData.append("username", this.week[0].username);
    formData.append("nbSeances", this.weekForm.value.nbSeances);
    formData.append("dateDebut", this.weekForm.value.dateDebut);


    this.http.post(this.apiUrlService.APIUrl + 'UpdateWeeks', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error adding fournisseur');
    });
    this.refreshWeeks();
  }
}
