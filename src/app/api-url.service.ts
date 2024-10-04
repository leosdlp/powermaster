import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  readonly APIUrl = 'http://localhost:5000/';

  constructor() {}
}
