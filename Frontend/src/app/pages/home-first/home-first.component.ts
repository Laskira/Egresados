import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home-first',
  templateUrl: './home-first.component.html',
  styleUrls: ['./home-first.component.scss'],
})
export class HomeFirstComponent implements OnInit {
  title = 'Tracing';
  Nombres = '';
  Sexo = ''
  salute = '';

  constructor(
    private adminService: AdminService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle(this.title);
    this.adminService.Perfil().subscribe(
      res => {
        // @ts-ignore
        this.Nombres = res.Nombres;
        // @ts-ignore
        this.Sexo = res.Sexo;
        if (this.Sexo === 'Masculino'){
          this.salute = 'Bienvenido';
        }else{
          this.salute = 'Bienvenida';
        }
      },
      err => console.log(err.error)
    );
  }

  ngOnInit() {}
}
