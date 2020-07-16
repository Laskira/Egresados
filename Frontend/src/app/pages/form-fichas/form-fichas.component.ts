import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleService } from 'src/app/services/title.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { FichaService } from 'src/app/services/ficha.service';
import { FormacionService } from 'src/app/services/formacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/services/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-fichas',
  templateUrl: './form-fichas.component.html',
  styleUrls: ['./form-fichas.component.scss'],
})
export class FormFichasComponent implements OnInit {
  title = 'Registrar Fichas';
  Formacion: any;
  Sede: any;
  titulo = 'Registrar';
  edit = false;
  id: string;

  FormFicha = new FormGroup({
    Numero: new FormControl(null, [Validators.required, Validators.min(1)]),
    IdFormacion: new FormControl(null, [Validators.required]),
    IdSede: new FormControl(null, [Validators.required]),
    InicioFormacion: new FormControl(null, [Validators.required]),
    FinLectiva: new FormControl(null, [Validators.required]),
    FinFormacion: new FormControl(null, [Validators.required]),
    Instructor: new FormControl(null, [Validators.required])
  });

  constructor(
    private titleService: TitleService,
    private fichaService: FichaService,
    private alertas: AlertsService,
    private formacionService: FormacionService,
    private sedeService: SedeService,
    private routerActive: ActivatedRoute,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
    this.formacionService.ObtenerFormaciones().subscribe(
      (res) => {
        this.Formacion = res;
      },
      (err) => console.log(err)
    );
    this.sedeService.ObtenerSedes().subscribe(
      (res) => {
        this.Sede = res;
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
    this.id = this.routerActive.snapshot.params.id;
    if (this.id) {
      this.titulo = 'Actualizar';
      this.edit = true;
      this.fichaService.ObtenerFicha(this.id).subscribe((res) => {
        // @ts-ignore
        const numero = res.Numero;
        // @ts-ignoreP
        const formacion = res.IdFormacion;
        // @ts-ignore
        const sede = res.IdSede;
        // @ts-ignore
        const iniciof = res.InicioFormacion;
        // @ts-ignore
        const etapalectiva = res.FinLectiva;
        // @ts-ignore
        const finf = res.FinFormacion;
        // @ts-ignore
        const instructor = res.Instructor;
        this.FormFicha.get('Numero').setValue(numero);
        this.FormFicha.get('IdFormacion').setValue(formacion._id);
        this.FormFicha.get('IdSede').setValue(sede._id);
        this.FormFicha.get('InicioFormacion').setValue(iniciof);
        this.FormFicha.get('FinLectiva').setValue(etapalectiva);
        this.FormFicha.get('FinFormacion').setValue(finf);
        this.FormFicha.get('Instructor').setValue(instructor);
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
          this.fichaService
            .ActualizarFicha(this.FormFicha.value, this.id)
            .subscribe(
              (res) => {
                this.router.navigate(['/admin/ficha/listar']);
              },
              (err) => console.log(err.error)
            );
        }
      });
    } else {
      this.fichaService.CrearFicha(this.FormFicha.value).subscribe(
        (res) => {
          this.alertas.Alert(res);
        },
        (err) => this.alertas.Alert(err.error)
      );
    }
  }
}
