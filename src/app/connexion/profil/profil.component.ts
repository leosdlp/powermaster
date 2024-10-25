import { Component, OnInit } from '@angular/core';
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
  selector: 'app-profil',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user = localStorage.getItem('currentUser');
  userJson = "";
  username:string = "";
  password:string = "";
  email:string = "";
  benchPr: number = 0;
  squatPr: number = 0;
  deadliftPr: number = 0;
  newUsername?: string;
  newPassword?: string;
  newConfirmPassword?: string;
  newEmail?: string;
  usersTemp: any = [];
  userForm!: FormGroup;
  userId: any;
  constructor(private apiUrlService: ApiUrlService, private router: Router, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder){
    this.userForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.required],
      benchPr: [this.benchPr,Validators.required],
      squatPr: [this.squatPr,Validators.required],
      deadliftPr: [this.deadliftPr,Validators.required],
    });
  }

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.username = currentUser.username;
      this.password = currentUser.password;
      this.email = currentUser.email;
      this.benchPr = currentUser.benchPr;
      this.squatPr = currentUser.squatPr;
      this.deadliftPr = currentUser.deadliftPr;
    }
    this.userId = this.authService.getUserId();
    this.newUsername = this.username;
    this.newEmail = this.email;
  }

  updateUser() {
    if (!this.userForm.value.username || !this.userForm.value.password || !this.userForm.value.email || !this.userForm.value.benchPr || !this.userForm.value.squatPr || !this.userForm.value.deadliftPr ) {
      alert('username, password, email, benchPr, squatPr and deadliftPr are required');
      return;
    }
    const formData = new FormData();

    formData.append("id", String(this.userId));
    formData.append("username", this.userForm.value.username);
    formData.append("password", this.userForm.value.password);
    formData.append("email", this.userForm.value.email);
    formData.append("benchPr", this.userForm.value.benchPr);
    formData.append("squatPr", this.userForm.value.squatPr);
    formData.append("deadliftPr", this.userForm.value.deadliftPr);

    this.http.post(this.apiUrlService.APIUrl + 'UpdateUsers', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error updating user');
    });
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      currentUser.id = this.userId;
      currentUser.username = this.userForm.value.username;
      currentUser.password = this.userForm.value.password;
      currentUser.email = this.userForm.value.email;
      currentUser.benchPr = this.userForm.value.benchPr;
      currentUser.squatPr = this.userForm.value.squatPr;
      currentUser.deadliftPr = this.userForm.value.deadliftPr;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    this.refreshUsers();
  }

  deconnect(): void{
    localStorage.removeItem('currentUser');
    this.router.navigate(['/connexion']);
  }

  deleteUser(){
    this.deleteUsers(this.username);
    this.authService.deleteUser(this.username, this.password);
    this.router.navigate(['/']);
  }

  deleteUsers(username:any){
    if (username !='admin'){
      this.http.delete(this.apiUrlService.APIUrl+'DeleteUsers?username='+username).subscribe(data=>{
        alert(data);
      })
    }
    this.refreshUsers();
  }

  refreshUsers() {
    this.http.get(this.apiUrlService.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
  }

  isAdmin(): boolean {
    return !(this.authService.isAdmin());
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
