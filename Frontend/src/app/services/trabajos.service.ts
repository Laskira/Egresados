import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {
  constructor(private api: ApiService, private http: HttpClient) {}

  URL = this.api.url() + '/trabajos';

  CrearTrabajo(trabajo) {
    return this.http.post(this.URL, trabajo);
  }

  ObtenerTrabajos() {
    return this.http.get(this.URL);
  }

  EliminarTrabajo(id: string) {
    return this.http.delete(this.URL + '/' + id);
  }

  ActualizarTrabajo(trabajo, id: string) {
    return this.http.put(this.URL + '/' + id, trabajo);
  }

  ObtenerSTrabajo(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

}
