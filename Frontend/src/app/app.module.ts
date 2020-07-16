import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'; // Invocación Material
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './services/token-interceptor.service';
// Modulos
import { FormAdminComponent } from './pages/form-admin/form-admin.component';
import { FormSedesComponent } from './pages/form-sedes/form-sedes.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { FormAprendicesComponent } from './pages/form-aprendices/form-aprendices.component';
import { FormFichasComponent } from './pages/form-fichas/form-fichas.component';
import { FormFormacionesComponent } from './pages/form-formaciones/form-formaciones.component';
import { FormHistorialesComponent } from './pages/form-historiales/form-historiales.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { from } from 'rxjs';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListAprendicesComponent } from './pages/list-aprendices/list-aprendices.component';
import { ListFichasComponent } from './pages/list-fichas/list-fichas.component';
import { ListFormacionComponent } from './pages/list-formacion/list-formacion.component';
import { ListHistorialesComponent } from './pages/list-historiales/list-historiales.component';
import { ListSedesComponent } from './pages/list-sedes/list-sedes.component';
import { HomeFirstComponent } from './pages/home-first/home-first.component';
import { SpinerComponent } from './components/spiner/spiner.component';
import { DateCustomPipe } from './pipes/date-custom.pipe';
import { FilesComponent } from './components/files/files.component';
import { ProgressComponent } from './components/progress/progress.component';
import {FilePdfComponent} from './components/file-pdf/file-pdf.component';
import { FormTrabajosComponent } from './pages/form-trabajos/form-trabajos.component';
import { ListTrabajosComponent } from './pages/list-trabajos/list-trabajos.component';

@NgModule({
  declarations: [
    AppComponent,
    FormAdminComponent,
    FormSedesComponent,
    LoginAdminComponent,
    FormAprendicesComponent,
    FormFichasComponent,
    FormFormacionesComponent,
    FormHistorialesComponent,
    HomeAdminComponent,
    ListAdminComponent,
    ListAprendicesComponent,
    ListFichasComponent,
    ListFormacionComponent,
    ListHistorialesComponent,
    ListSedesComponent,
    HomeFirstComponent,
    SpinerComponent,
    DateCustomPipe,
    FilesComponent,
    FilePdfComponent,
    ProgressComponent,
    FormTrabajosComponent,
    ListTrabajosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
