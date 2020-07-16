import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleService } from 'src/app/services/title.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {TrabajosService} from 'src/app/services/trabajos.service';
import {AprendizService} from 'src/app/services/aprendiz.service';

@Component({
  selector: 'app-form-trabajos',
  templateUrl: './form-trabajos.component.html',
  styleUrls: ['./form-trabajos.component.scss']
})
export class FormTrabajosComponent implements OnInit {
  title = 'Registrar Empleos';
  Aprendiz: any;
  titulo = 'Registrar';
  edit = false;
  id: string;

  FormEmpleo = new FormGroup({
    IdAprendiz: new FormControl(null, [Validators.required]),
    Empresa: new FormControl(null, [Validators.required, Validators.minLength(3)]
    ),
    EntradaEmpresa: new FormControl(null, [Validators.required]),
    TipoContrato: new FormControl(null, [Validators.required]),
    Cargo: new FormControl(null, [Validators.required]),
    Comentarios: new FormControl(null),
  });
  constructor(
    private titleService: TitleService,
    private routerActive: ActivatedRoute,
    private router: Router,
    private alertas: AlertsService,
    private trabajosService: TrabajosService,
    private aprendizService: AprendizService
  ) {
    this.titleService.setTitle(this.title);
    this.aprendizService.ObtenerAprendices().subscribe(
      (res) => {
        this.Aprendiz = res;
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
    this.id = this.routerActive.snapshot.params.id;

    if (this.id) {
      this.titulo = 'Actualizar';
      this.edit = true;

      this.trabajosService.ObtenerSTrabajo(this.id).subscribe((res) => {
        // @ts-ignore
        const aprendiz = res.IdAprendiz;
        this.FormEmpleo.get('IdAprendiz').setValue(aprendiz);
        // @ts-ignore
        const empresa = res.Empresa;
        this.FormEmpleo.get('Empresa').setValue(empresa);
        // @ts-ignore
        const entrada = res.EntradaEmpresa;
        this.FormEmpleo.get('EntradaEmpresa').setValue(entrada);
        // @ts-ignore
        const contrato = res.TipoContrato;
        this.FormEmpleo.get('TipoContrato').setValue(contrato);
        // @ts-ignore
        const cargo = res.Cargo;
        this.FormEmpleo.get('Cargo').setValue(cargo);
        // @ts-ignore
        const comentarios = res.Comentarios;
        this.FormEmpleo.get('Comentarios').setValue(comentarios);
      });
    }
  }

  Submit() {
    if (this.id) {
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
          this.trabajosService.ActualizarTrabajo(
            this.FormEmpleo.value,
            this.id
          ).subscribe(
            (res) => {
              this.router.navigate(['/admin/empleo/listar']);
            },
            (err) => console.log(err.error)
          );
        }
      });
    }else{
    this.trabajosService.CrearTrabajo(this.FormEmpleo.value).subscribe(
      (res) => {
        this.alertas.Alert(res);
      },
      (err) => this.alertas.Alert(err.error)
    );
    }
  }

}
