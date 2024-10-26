import { Component, OnInit } from '@angular/core';
import { ApiUrlService } from './service/api-url.service';
import { RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AdminAuthService } from './service/admin-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'situation_1';
  appRoutes = routes;
  notes: any = [];
  usersTemp: any = [];
  fournisseursTemp: any = [];
  produitsTemp: any = [];
  productsTemp: any = [];
  avisTemp: any = [];

  constructor(private apiUrlService: ApiUrlService, private router: Router,private http: HttpClient,  private authService: AdminAuthService) { }

  ngOnInit(): void {
    this.refreshUsers()
  }

  refreshUsers() {
    this.http.get(this.apiUrlService.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
