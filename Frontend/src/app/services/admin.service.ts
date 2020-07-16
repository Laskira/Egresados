import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private api: ApiService, private http: HttpClient) {}

  URL = this.api.url() + '/admin/';

  Acceder(Admin) {
    return this.http.post(this.URL + '/acceder', Admin);
  }

  Perfil() {
    return this.http.get(this.URL);
  }

  CrearAdmin(usuario) {
    return this.http.post(this.URL, usuario);
  }

  ObtenerAdmins() {
    return this.http.get(this.URL + '/cuentas');
  }

  EliminarAdmin(id: string) {
    return this.http.delete(this.URL + '/' + id);
  }
}
