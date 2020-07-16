import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormacionService {
  constructor(private api: ApiService, private http: HttpClient) {}

  URL = this.api.url() + '/formacion';

  CrearFormacion(formacion) {
    return this.http.post(this.URL, formacion);
  }

  ObtenerFormaciones() {
    return this.http.get(this.URL);
  }

  EliminarFormacion(id: string) {
    return this.http.delete(this.URL + '/' + id);
  }

  ActualizarFormacion(formacion, id: string) {
    return this.http.put(this.URL + '/' + id, formacion);
  }

  ObtenerFormacion(id: string) {
    return this.http.get(this.URL + '/' + id);
  }
}
