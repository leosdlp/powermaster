import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { ApiUrlService } from '../../service/api-url.service';
import { RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../service/admin-auth.service'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ RouterModule, CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  usersTemp: any = [];
  users: User[] = [];

  constructor( private apiUrlService: ApiUrlService, private router: Router, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.refreshUsers();
    this.users = this.authService.getUsers();
  }

  refreshUsers() {
    this.http.get(this.apiUrlService.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
  }
}
