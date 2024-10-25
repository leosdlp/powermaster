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

@Component({
  selector: 'app-week-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './week-list.component.html',
  styleUrl: './week-list.component.css'
})
export class WeekListComponent implements OnInit{
  weeks: Week[] = []
  weeksTemp: any = [];
  userId: any;

  constructor(private apiUrlService: ApiUrlService, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router, private seanceService: SeanceService, private weekService: WeekService) {

  }

  ngOnInit(): void {
    this.refreshWeeks();
    this.userId = this.authService.getUserId()
    this.weeks = this.weekService.getWeekByUserId(this.userId);
  }

  async refreshWeeks() {
    this.http.get(this.apiUrlService.APIUrl + 'GetWeeks').subscribe(data => {
      this.weekService.weeksTemp = data;
      this.weeksTemp = data;
    });
    this.weekService.setApiWeeks();
    this.weekService.getWeeks();
  }

  showWeek(id: any) {
    this.router.navigate(['/week-show', id]);
  }

  updateWeek(id: any) {
    this.router.navigate(['/week-update', id]);
  }

  deleteWeek(id:any){
    this.http.delete(this.apiUrlService.APIUrl + 'DeleteWeeks?id='+String(id)).subscribe(data=>{
      alert(data);
    })
    this.refreshWeeks();
  }
}
