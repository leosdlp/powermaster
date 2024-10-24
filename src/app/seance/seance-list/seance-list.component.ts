import { AdminAuthService } from '../../service/admin-auth.service';
import { Seance } from '../../model/seance.model';
import { ApiUrlService } from '../../service/api-url.service';
import { SeanceService } from '../../service/seance.service';
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


@Component({
  selector: 'app-seance-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './seance-list.component.html',
  styleUrl: './seance-list.component.css'
})
export class SeanceListComponent implements OnInit{
  seances: Seance[] = [];
  seancesTemp: any = [];
  constructor(private apiUrlService: ApiUrlService, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router, private seanceService: SeanceService) {

  }

  ngOnInit(): void {
    this.refreshSeances();
      this.seances = this.seanceService.getSeances();
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
