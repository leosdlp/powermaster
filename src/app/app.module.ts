import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, CommonModule, RouterModule.forRoot(routes), HttpClientModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
