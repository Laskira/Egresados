import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SedeService } from 'src/app/services/sede.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-sedes',
  templateUrl: './form-sedes.component.html',
  styleUrls: ['./form-sedes.component.scss'],
})
export class FormSedesComponent implements OnInit {
  title = 'Registrar Sedes';
  titulo = 'Registrar';
  edit = false;
  id: string;

  FormSede = new FormGroup({
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private SedeService: SedeService,
    private alerta: AlertsService,
    private routerActive: ActivatedRoute,
    private TitleService: TitleService,
    private router: Router
  ) {
    this.TitleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.id = this.routerActive.snapshot.params.id;

    if (this.id) {
      this.titulo = 'Actualizar';
      this.edit = true;

      this.SedeService.ObtenerSede(this.id).subscribe((res) => {
        // @ts-ignore
        const nombre = res.Nombre;
        this.FormSede.get('Nombre').setValue(nombre);
      });
    }
  }

  Submit() {
    if (this.edit) {
      Swal.fire({
        title: '¿Estás seguro',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3F51B5',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.SedeService.ActualizarSede(
            this.FormSede.value,
            this.id
          ).subscribe(
            (res) => {
              this.router.navigate(['/admin/sede/listar']);
            },
            (err) => console.log(err.error)
          );
        }
      });
    } else {
      this.SedeService.CrearSede(this.FormSede.value).subscribe(
        (res) => {
          this.alerta.Alert(res);
        },
        (err) => this.alerta.Alert(err.error)
      );
    }
  }
}
