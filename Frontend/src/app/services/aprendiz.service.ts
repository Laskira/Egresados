import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AprendizService {
  constructor(private api: ApiService, private http: HttpClient) {}

  URL = this.api.url() + '/aprendiz/';

  CrearAprendiz(aprendiz) {
    return this.http.post(this.URL, toFormData(aprendiz), {
      reportProgress: true,
      observe: 'events',
    });
  }

  ObtenerAprendices() {
    return this.http.get(this.URL);
  }

  EliminarAprendiz(id: string) {
    return this.http.delete(this.URL + id);
  }

  ObtenerAprendiz(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

  ActualizarAprendiz(aprendiz, id: string) {
return this.http.put(this.URL + '/' + id, aprendiz);
  }
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
