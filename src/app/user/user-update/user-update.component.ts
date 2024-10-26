import { Component, OnInit } from '@angular/core';
import { ApiUrlService } from '../../service/api-url.service';
import { RouterOutlet } from '@angular/router';
import { User } from '../../model/user.model';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../service/admin-auth.service'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{
  user: User[] = [];
  username:string = "";
  password:string = "";
  email:string = "";
  role:string = "";
  benchPr: number = 0;
  squatPr: number = 0;
  deadliftPr: number = 0;
  usersTemp: any = [];
  userForm!: FormGroup;
  userId: any;

  constructor(private apiUrlService: ApiUrlService, private router: Router, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute){
    this.userForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.required],
      role: ['',Validators.required],
      benchPr: [this.benchPr,Validators.required],
      squatPr: [this.squatPr,Validators.required],
      deadliftPr: [this.deadliftPr,Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.getIdFromUrl();
    this.user = this.authService.getUserById(this.userId);
    this.username = this.user[0].username;
    this.password = this.user[0].password;
    this.email = this.user[0].email;
    this.role = String(this.user[0].role);
    this.benchPr = this.user[0].benchPr;
    this.squatPr = this.user[0].squatPr;
    this.deadliftPr = this.user[0].deadliftPr;
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
    formData.append("role",  this.userForm.value.role);
    formData.append("benchPr", this.userForm.value.benchPr);
    formData.append("squatPr", this.userForm.value.squatPr);
    formData.append("deadliftPr", this.userForm.value.deadliftPr);

    console.log(formData);

    this.http.post(this.apiUrlService.APIUrl + 'UpdateUsers', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error updating user');
    });
    this.refreshUsers();
  }

  isAdmin(): boolean {
    return !(this.authService.isAdmin());
  }

  getIdFromUrl(): String {
    const id = String(this.route.snapshot.paramMap.get('id'));
    return id;
  }

  refreshUsers() {
    this.http.get(this.apiUrlService.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
  }
}
