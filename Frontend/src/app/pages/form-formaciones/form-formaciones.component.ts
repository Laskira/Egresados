import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormacionService } from 'src/app/services/formacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { TitleService } from 'src/app/services/title.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-formaciones',
  templateUrl: './form-formaciones.component.html',
  styleUrls: ['./form-formaciones.component.scss'],
})
export class FormFormacionesComponent implements OnInit {
  title = 'Registrar Formaciones';
  titulo = 'Registrar';
  edit = false;
  id: string;
  FormFormacion = new FormGroup({
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Tipo: new FormControl('', [Validators.required]),
  });

  constructor(
    private FormacionService: FormacionService,
    private alerta: AlertsService,
    private TitleService: TitleService,
    private router: Router,
    private routerActive: ActivatedRoute
  ) {
    this.TitleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.id = this.routerActive.snapshot.params.id;
    if (this.id) {
      this.titulo = 'Actualizar';
      this.edit = true;
      this.FormacionService.ObtenerFormacion(this.id).subscribe((res) => {
        // @ts-ignore
        const nombre = res.Nombre;
        // @ts-ignore
        const tipo = res.Tipo;
        this.FormFormacion.get('Nombre').setValue(nombre);
        this.FormFormacion.get('Tipo').setValue(tipo);
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
          this.FormacionService.ActualizarFormacion(
            this.FormFormacion.value,
            this.id
          ).subscribe(
            (res) => {
              this.router.navigate(['/admin/formacion/listar']);
            },
            (err) => console.log(err.error)
          );
        }
      });
    } else {
      this.FormacionService.CrearFormacion(this.FormFormacion.value).subscribe(
        (res) => {
          this.alerta.Alert(res);
        },
        (err) => this.alerta.Alert(err.error)
      );
    }
  }
}
