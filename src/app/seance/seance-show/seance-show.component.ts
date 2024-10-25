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
  selector: 'app-seance-show',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './seance-show.component.html',
  styleUrl: './seance-show.component.css'
})
export class SeanceShowComponent implements OnInit{
  seance: Seance[] = [];
  seancesTemp: any = [];
  seanceId: any = '';

  constructor(private apiUrlService: ApiUrlService, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router, private seanceService: SeanceService, private weekService: WeekService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.refreshSeances();
    this.seanceId = this.getIdFromUrl()
    this.seance = this.seanceService.getSeancesById(this.seanceId);
    console.log(this.seance);
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
