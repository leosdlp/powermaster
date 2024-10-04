import { AdminAuthService } from '../admin-auth.service';
import { ApiUrlService } from '../api-url.service';
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
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit{
  loginUsername:string = '';
  loginPassword:string = '';
  username:string = '';
  password:string = '';
  email:string = '';
  passwordVerif:string = '';
  connexion: boolean = true;
  inscription: boolean = false;
  usersTemp: any = [];


  constructor(private apiUrlService: ApiUrlService, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  refreshUsers() {
    this.http.get(this.apiUrlService.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
  }

  login(): void {
    const success = this.authService.login(this.loginUsername, this.loginPassword);
    if (success) {
      console.log('Connexion réussie !');
      this.router.navigate(['/']);
    } else {
      console.log('Identifiants incorrects.');
    }
  }

  addUsers() {
    if (!this.username || !this.password || !this.email) {
      alert("Username and password are required");
      return;
    }
    const formData = new FormData();
    formData.append("username", this.username);
    formData.append("password", this.password);
    formData.append("email", this.email);

    this.http.post(this.apiUrlService.APIUrl + 'AddUsers', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error adding user');
    });
  }

  register(): void {
    const verifPassword = this.password == this.passwordVerif;
    const success = this.authService.register(this.username, this.password, this.passwordVerif, this.email);
    if (success) {
      if(verifPassword){
        this.addUsers();
        console.log('Inscription réussie !');
        this.connexionForm();
      }
      else{
        console.log('Les mots de passe ne sont pas similaires.');
      }
    } else {
      console.log('L\'utilisateur existe déjà.');
    }
  }

  connexionForm(){
    this.connexion = true;
    this.inscription = false;
  }

  InscriptionForm(){
    this.connexion = false;
    this.inscription = true;
  }
}
