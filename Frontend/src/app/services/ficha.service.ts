import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FichaService {
  constructor(private api: ApiService, private http: HttpClient) {}

  URL = this.api.url() + '/fichas';

  CrearFicha(ficha) {
    return this.http.post(this.URL, ficha);
  }

  ObtenerFichas() {
    return this.http.get(this.URL);
  }

  Show(){
    return this.http.get(this.URL + '/mostrar');
  }

  EliminarFicha(id: string) {
    return this.http.delete(this.URL + '/' + id);
  }

  ActualizarFicha(ficha, id: string) {
    return this.http.put(this.URL + '/' + id, ficha);
  }

  ObtenerFicha(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

}
