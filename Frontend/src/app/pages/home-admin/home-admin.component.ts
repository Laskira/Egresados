import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { routerTransition } from 'src/app/material/router.animation';
import { AdminService } from 'src/app/services/admin.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
  animations: [routerTransition],
})
export class HomeAdminComponent implements OnInit {
  title = 'Tracing';
  menuActive = false;

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  mostrar = false;
  sede: Array<any>;
  formacion: Array<any>;
  ficha: Array<any>;
  aprendiz: Array<any>;
  historial: Array<any>;
  empleo: Array<any>;

  constructor(
    public token: TokenService,
    private admin: AdminService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle(this.title);
    this.admin.Perfil().subscribe((res) => {
      if (res) {
        // @ts-ignore
        if (res.Documento === 'root') {
          this.sede = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'sede/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'sede/listar',
            },
          ];

          this.formacion = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'formacion/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'formacion/listar',
            },
          ];

          this.ficha = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'ficha/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'ficha/listar',
            },
          ];

          this.aprendiz = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'aprendiz/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'aprendiz/listar',
            },
          ];

          this.historial = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'historial/registrar',
            }
          ];
        } else {
          this.sede = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'sede/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'sede/listar',
            },
          ];

          this.formacion = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'formacion/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'formacion/listar',
            },
          ];

          this.ficha = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'ficha/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'ficha/listar',
            },
          ];

          this.aprendiz = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'aprendiz/registrar',
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'aprendiz/listar',
            },
          ];

          this.historial = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'historial/registrar',
            }
          ];

          this.empleo = [
            {
              Label: 'Registrar',
              Icon: 'add',
              Router: 'empleo/registrar'
            },
            {
              Label: 'Mostrar',
              Icon: 'toc',
              Router: 'empleo/listar',
            }
          ];
        }
      }
    });
  }

  ngOnInit(): void {}



}
