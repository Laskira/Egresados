import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private titleServie: Title) { }

  setTitle(title: string) {
    this.titleServie.setTitle(title);
  }
}
