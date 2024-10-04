import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  readonly APIUrl = 'https://apipowermaster.onrender.com/';

  constructor() {}
}
