import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import {
  HistorialService,
  uploadProgress,
  toResponseBody,
  markAllAsDirty,
} from 'src/app/services/historial.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AprendizService } from 'src/app/services/aprendiz.service';
import { requiredFileType } from 'src/app/validators/image-validators';

@Component({
  selector: 'app-form-historiales',
  templateUrl: './form-historiales.component.html',
  styleUrls: ['./form-historiales.component.scss'],
})
export class FormHistorialesComponent implements OnInit {
  title = 'Registrar Historiales';
  titulo = 'Registrar';
  edit = false;
  id: string;
  MedioComunicacion: any;
  documento: string;
  Admin: any;
  Aprendiz: any;

  FormHistorial = new FormGroup({
    IdAprendiz: new FormControl(null, [Validators.required]),
    IdAdmin: new FormControl(null, [Validators.required]),
    MedioComunicacion: new FormControl(null, [Validators.required]),
    Comentarios: new FormControl(null),
    Pruebas: new FormControl(null, [Validators.required, requiredFileType()]),
  });

  constructor(
    private titleService: TitleService,
    private alertas: AlertsService,
    private historialesService: HistorialService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private adminService: AdminService,
    private aprendizService: AprendizService
  ) {
    this.titleService.setTitle(this.title);
    this.adminService.ObtenerAdmins().subscribe(
      (res) => {
        this.Admin = res;
      },
      (err) => console.log(err)
    );
    this.aprendizService.ObtenerAprendices().subscribe(
      (res) => {
        this.Aprendiz = res;
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}

  Submit() {
    console.log(this.FormHistorial.value);
    this.historialesService.CrearHistorial(this.FormHistorial.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.FormHistorial.reset(); // Vaciar Form
        },
        (err) => console.log(err.error)
      );
  }
}
