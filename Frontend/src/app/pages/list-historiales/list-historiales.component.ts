import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { rowsAnimation } from 'src/app/material/table.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorialService } from 'src/app/services/historial.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertsService } from 'src/app/services/alerts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-historiales',
  templateUrl: './list-historiales.component.html',
  styleUrls: ['./list-historiales.component.scss'],
  animations: [rowsAnimation],
})
export class ListHistorialesComponent implements OnInit {
  title = 'Ver Historiales';
  id: string;


  displayedColumns: string[] = [
    'Pruebas',
    'Aprendiz',
    'Admin',
    'MedioComunicacion',
    'Comentarios',
    'createdAt',
    'Acciones'
  ];
  dataSource: MatTableDataSource<any[]>;
  carga = true;
  noData = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private titleService: TitleService,
    private routerActive: ActivatedRoute,
    private router: Router,
    private historialService: HistorialService,
    private alerta: AlertsService,
    public api: ApiService
  ) {
    this.titleService.setTitle(this.title);

    this.id = this.routerActive.snapshot.params.id;
    this.historialService.ObtenerHistorialAprendiz(this.id).subscribe((data: {}) => {
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
          this.historialService.EliminarHistorial(element).subscribe(
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
