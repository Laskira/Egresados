import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';

import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
  title = 'Acceder';
  hide = true;

  constructor(
    private AdminService: AdminService,
    private router: Router,
    private alerts: AlertsService,
    private token: TokenService,
    private TitleService: TitleService
  ) {
    this.TitleService.setTitle(this.title);
  }

  FormLogin = new FormGroup({
    Documento: new FormControl('', [Validators.required, Validators.min(4)]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.router.navigate(['/admin']);
    }
  }

  login() {
    this.AdminService.Acceder(this.FormLogin.value).subscribe(
      (res) => {
        if (res) {
          // @ts-ignore
          console.log(res.mensaje);
          // @ts-ignore
          localStorage.setItem('token', res.token);
          this.router.navigate(['admin/']);
        }
      },
      (err) => {
        this.alerts.Alert(err.error);
      }
    );
  }
}
