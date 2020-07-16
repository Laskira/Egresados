import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  url() {
    return 'http://localhost:4000/';
  }
}
