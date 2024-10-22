import { AdminAuthService } from '../../service/admin-auth.service';
import { ApiUrlService } from '../../service/api-url.service';
import { WeekService } from '../../service/week.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-week-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './week-create.component.html',
  styleUrl: './week-create.component.css'
})
export class WeekCreateComponent implements OnInit{
  weekForm!: FormGroup;
  username: any = "";
  nbSeances: any = 5;
  weeksTemp: any = [];
  dateDebut: any = '';

  constructor(private apiUrlService: ApiUrlService, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router, private weekService: WeekService) {

  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.weekForm = this.fb.group({
      nbSeances: [''],
      dateDebut: ['']
    });
    this.refreshWeeks();
  }

  ajouterWeek() {
    this.addWeeks();
  }

  addWeeks() {
    if (!this.username) {
      alert('Connectez-vous avant de créer une week');
    }
    if (!this.weekForm.value.nbSeances || !this.weekForm.value.dateDebut) {
      alert('nbSeances and dateDebut are required');
      return;
    }
    const formData = new FormData();

    formData.append("username", this.username);
    formData.append("nbSeances", this.weekForm.value.nbSeances);
    formData.append("dateDebut", this.weekForm.value.dateDebut);


    this.http.post(this.apiUrlService.APIUrl + 'AddWeeks', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error adding fournisseur');
    });
    this.refreshWeeks();
  }

  async refreshWeeks() {
    this.http.get(this.apiUrlService.APIUrl + 'GetWeeks').subscribe(data => {
      this.weekService.weeksTemp = data;
      this.weeksTemp = data;
    });
    this.weekService.setApiWeeks();
    this.weekService.getWeeks();
  }
}
