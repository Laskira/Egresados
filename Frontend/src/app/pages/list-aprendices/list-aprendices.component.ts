import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { rowsAnimation } from 'src/app/material/table.animation';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';
import { AprendizService } from 'src/app/services/aprendiz.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-aprendices',
  templateUrl: './list-aprendices.component.html',
  styleUrls: ['./list-aprendices.component.scss'],
  animations: [rowsAnimation],
})
export class ListAprendicesComponent implements OnInit {
  title = 'Ver Aprendices';

  displayedColumns: string[] = [
    'Documento',
    'Nombres',
    'P_Apellido',
    'S_Apellido',
    'Telefono',
    'FichaTecnica',
    'FichaTecnologica',
    'Practicas',
    'HojaVida',
    'Acciones',
  ];
  dataSource: MatTableDataSource<any[]>;
  carga = true;
  noData = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private titleService: TitleService,
    private aprendizService: AprendizService,
    private alerta: AlertsService,
    private router: Router,
    public api: ApiService
  ) {
    this.titleService.setTitle(this.title);
    this.aprendizService.ObtenerAprendices().subscribe((data: {}) => {
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
          this.aprendizService.EliminarAprendiz(element).subscribe(
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
      this.router.navigate(['/admin/aprendiz/actualizar/' + element]);
    }

    if (accion === '4') {
      this.router.navigate(['/admin/historial/listar/' + element]);
    }
  }

  showPdf(element) {
    window.open(element, '_blank'); // This open the pdf file in a new window
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
