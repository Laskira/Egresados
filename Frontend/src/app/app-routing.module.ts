import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guardían de enrutaje
import { RutasGuard } from './guard/rutas.guard';
// Public Components
import { FormAdminComponent } from './pages/form-admin/form-admin.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
// Privade Components
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeFirstComponent } from './pages/home-first/home-first.component';
import { FormFormacionesComponent } from './pages/form-formaciones/form-formaciones.component';
import { FormAprendicesComponent } from './pages/form-aprendices/form-aprendices.component';
import { FormFichasComponent } from './pages/form-fichas/form-fichas.component';
import { FormHistorialesComponent } from './pages/form-historiales/form-historiales.component';
import { FormSedesComponent } from './pages/form-sedes/form-sedes.component';
// List Components
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListAprendicesComponent } from './pages/list-aprendices/list-aprendices.component';
import { ListFichasComponent } from './pages/list-fichas/list-fichas.component';
import { ListFormacionComponent } from './pages/list-formacion/list-formacion.component';
import { ListSedesComponent } from './pages/list-sedes/list-sedes.component';
import { FormTrabajosComponent } from './pages/form-trabajos/form-trabajos.component';
import { ListTrabajosComponent } from './pages/list-trabajos/list-trabajos.component';
const routes: Routes = [
  {
    path: '',
    component: LoginAdminComponent,
    data: { state: 0 },
  },
  {
    path: 'registrar',
    component: FormAdminComponent,
    data: { state: 1 },
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    canActivate: [RutasGuard],
    children: [
      {
        path: '',
        component: HomeFirstComponent,
        data: { state: 2 }
      },
      {
        path: 'sede/registrar',
        component: FormSedesComponent,
        data: { state: 3 }
      },
      {
        path: 'formacion/registrar',
        component: FormFormacionesComponent,
        data: { state: 4 }
      },
      {
        path: 'ficha/registrar',
        component: FormFichasComponent,
        data: { state: 5 }
      },
      {
        path: 'aprendiz/registrar',
        component: FormAprendicesComponent,
        data: { state: 6 }
      },
      {
        path: 'empleo/registrar',
        component: FormTrabajosComponent,
        data: { state: 7 }
      },
      {
        path: 'sede/listar',
        component: ListSedesComponent,
        data: { state: 8 }
      },
      {
        path: 'formacion/listar',
        component: ListFormacionComponent,
        data: { state: 9 }
      },
      {
        path: 'ficha/listar',
        component: ListFichasComponent,
        data: { state: 10 }
      },
      {
        path: 'aprendiz/listar',
        component: ListAprendicesComponent,
        data: { state: 11 }
      },
      {
        path: 'empleo/listar',
        component: ListTrabajosComponent,
        data: { state: 12 }
      },
      {
        path: 'sede/actualizar/:id',
        component: FormSedesComponent,
        data: { state: 13 },
      },
      {
        path: 'formacion/actualizar/:id',
        component: FormFormacionesComponent,
        data: {state: 14}
      },
      {
        path: 'ficha/actualizar/:id',
        component: FormFichasComponent,
        data: {state: 15}
      },
      {
        path: 'historial/actualizar/:id',
        component: FormHistorialesComponent,
        data: {state: 16}
      },
      {
        path: 'aprendiz/actualizar/:id',
        component: FormAprendicesComponent,
        data: {state: 17}
      },
      {  path: 'empleo/actualizar/:id',
      component: FormTrabajosComponent,
        data: { state: 18 }
      },
      {
        path: 'aprendiz/listar/:id',
        component: ListAprendicesComponent,
        data: { state: 19 }
      },
      {
        path: 'administrador/listar',
        component: ListAdminComponent,
        data: { state: 20}
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
