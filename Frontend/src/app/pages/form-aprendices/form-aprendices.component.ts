import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleService } from 'src/app/services/title.service';
import { FichaService } from 'src/app/services/ficha.service';
import {
  AprendizService,
  uploadProgress,
  toResponseBody,
  markAllAsDirty,
} from 'src/app/services/aprendiz.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilePdf } from 'src/app/validators/pdf-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-aprendices',
  templateUrl: './form-aprendices.component.html',
  styleUrls: ['./form-aprendices.component.scss'],
})
export class FormAprendicesComponent implements OnInit {
  title = 'Registrar Aprendices';
  FichaTecnica: any;
  FichaTecnologica: any;
  titulo = 'Registrar';
  edit = false;
  id: string;

  FormAprendiz = new FormGroup({
    Documento: new FormControl(null, [Validators.required]),
    Nombres: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    P_Apellido: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    S_Apellido: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    Sexo: new FormControl(null, [Validators.required]),
    Telefono: new FormControl(null, [Validators.required]),
    Correo: new FormControl(null, [Validators.required]),
    Direccion: new FormControl(null, [Validators.required]),
    IdFichaTecnica: new FormControl(null),
    IdFichaTecnologica: new FormControl(null),
    Practicas: new FormControl(null, [Validators.required]),
    HojaVida: new FormControl(null, [Validators.required, FilePdf()]),
  });

  constructor(
    private titleService: TitleService,
    private fichaService: FichaService,
    private aprendizService: AprendizService,
    private alertas: AlertsService,
    private routerActive: ActivatedRoute,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
    this.fichaService.ObtenerFichas().subscribe(
      (res) => {
        this.FichaTecnica = res;
        this.FichaTecnologica = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.id = this.routerActive.snapshot.params.id;
    if (this.id) {
      this.titulo = 'Actualizar';
      this.edit = true;
      this.aprendizService.ObtenerAprendiz(this.id).subscribe((res) => {
        // @ts-ignore
        const documento = res.Documento;
        // @ts-ignore
        const nombres = res.Nombres;
        // @ts-ignore
        const papellido = res.P_Apellido;
        // @ts-ignore
        const sapellido = res.S_Apellido;
        // @ts-ignore
        const sexo = res.Sexo;
        // @ts-ignore
        const telefono = res.Telefono;
        // @ts-ignore
        const correo = res.Correo;
        // @ts-ignore
        const direccion = res.Direccion;
        // @ts-ignore
        const fichaTecnica = res.FichaTecnica.Numero;
        // @ts-ignore
        const fichaTecnologica = res.FichaTecnologica.Numero;
        // @ts-ignore
        const practicas = res.Practicas;
        // @ts-ignore
        const hojavida = res.HojaVida;
        this.FormAprendiz.get('Documento').setValue(documento);
        this.FormAprendiz.get('Nombres').setValue(nombres);
        this.FormAprendiz.get('P_Apellido').setValue(papellido);
        this.FormAprendiz.get('S_Apellido').setValue(sapellido);
        this.FormAprendiz.get('Sexo').setValue(sexo);
        this.FormAprendiz.get('Telefono').setValue(telefono);
        this.FormAprendiz.get('Correo').setValue(correo);
        this.FormAprendiz.get('Direccion').setValue(direccion);
        this.FormAprendiz.get('IdFichaTecnica').setValue(fichaTecnica);
        this.FormAprendiz.get('IdFichaTecnologica').setValue(fichaTecnologica);
        this.FormAprendiz.get('Practicas').setValue(practicas);
        this.FormAprendiz.get('HojaVida').setValue(hojavida);
       // this.FormAprendiz.controls.HojaVida.disable();
      });
    }
  }

  ngOnInit(): void {}

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
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.aprendizService
            .ActualizarAprendiz(this.FormAprendiz.value, this.id)
            .subscribe(
              (res) => {
                this.router.navigate(['/admin/aprendiz/listar']);
              },
              (err) => console.log(err.error)
            );
        }
      });
    } else {
      this.aprendizService.CrearAprendiz(this.FormAprendiz.value).subscribe(
        (res) => {
          this.router.navigate(['/admin/aprendiz/listar']);
        },
        (err) => this.alertas.Alert(err.error)
      );
    }
  }
}
