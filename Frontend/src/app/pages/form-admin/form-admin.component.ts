import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { TitleService } from 'src/app/services/title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.scss'],
})
export class FormAdminComponent implements OnInit {
  title = 'Registro de Administrador';

  hide = true;

  FormAdmin = new FormGroup({
    Cedula: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    Nombres: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    P_Apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    S_Apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    Sexo: new FormControl('', [Validators.required]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ])
  });

  constructor(
    private AdminService: AdminService,
    private alerta: AlertsService,
    private router: Router,
    private TitleService: TitleService
  ) {
    this.TitleService.setTitle(this.title);
  }

  ngOnInit(): void {}

  CrearAdmin() {
    this.AdminService.CrearAdmin(this.FormAdmin.value).subscribe(
      (res) => {
        this.router.navigate(['/admin']);
      },
      (err) => this.alerta.Alert(err.error)
    );
  }
}
