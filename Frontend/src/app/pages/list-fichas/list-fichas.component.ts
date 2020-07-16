import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { rowsAnimation } from 'src/app/material/table.animation';
import Swal from 'sweetalert2';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-list-fichas',
  templateUrl: './list-fichas.component.html',
  styleUrls: ['./list-fichas.component.scss'],
  animations: [rowsAnimation],
})
export class ListFichasComponent implements OnInit {
  title = 'Ver Fichas';

  displayedColumns: string[] = [
    'Numero',
    'Formacion',
    'Sede',
    'InicioFormacion',
    'FinLectiva',
    'FinFormacion',
    'Instructor',
    'Acciones'
  ];
  dataSource: MatTableDataSource<any[]>;
  carga = true;
  noData = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private titleService: TitleService,
    private fichaService: FichaService,
    private alerta: AlertsService,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
    this.fichaService.Show().subscribe((data: {}) => {
      // @ts-ignore
      this.dataSource.data = data;
      if (data) {
        // @ts-ignore
        if (data.length === 0) {
          this.noData = true;
        }
        this.carga = false;
      }
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  acciones(accion: string, element) {
    if (accion === '2') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podras revertir está acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3F51B5',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.fichaService.EliminarFicha(element).subscribe(
            (res) => {
              if (res) {
                this.dataSource.data = this.dataSource.data.filter(
                  (value, key) => {
                    // @ts-ignore
                    return value._id !== element;
                  }
                );
                this.alerta.Alert(res);
              }
            },
            (err) => console.log(err)
          );
        }
      });
    }

    if (accion === '3') {
      this.router.navigate(['/admin/ficha/actualizar/' + element]);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
