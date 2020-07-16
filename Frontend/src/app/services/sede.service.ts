import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  constructor(private api: ApiService, private http: HttpClient) {}

  URL = this.api.url() + '/sedes';

  CrearSede(sede) {
    return this.http.post(this.URL, sede);
  }

  ObtenerSedes() {
    return this.http.get(this.URL);
  }

  EliminarSede(id: string) {
    return this.http.delete(this.URL + '/' + id);
  }

  ActualizarSede(sede, id: string) {
    return this.http.put(this.URL + '/' + id, sede);
  }

  ObtenerSede(id: string) {
    return this.http.get(this.URL + '/' + id);
  }
}
