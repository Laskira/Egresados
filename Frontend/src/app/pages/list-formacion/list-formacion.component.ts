import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormacionService } from 'src/app/services/formacion.service';
import { rowsAnimation } from 'src/app/material/table.animation';
import Swal from 'sweetalert2';
import { AlertsService } from 'src/app/services/alerts.service';
import { TitleService } from 'src/app/services/title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-formacion',
  templateUrl: './list-formacion.component.html',
  styleUrls: ['./list-formacion.component.scss'],
  animations: [rowsAnimation]
})
export class ListFormacionComponent implements OnInit {
  title = 'Ver Formaciones';
  columns = [
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (row: any) => `${row.Nombre}`
    },
    {
      columnDef: 'Tipo',
      header: 'Tipo',
      cell: (row: any) => `${row.Tipo}`
    },
    {
      columnDef: 'Acciones',
      header: 'Acciones',
      cell: (row: any) => `${row._id}`
    }
  ];

  displayedColumns = this.columns.map((x) => x.columnDef);
  dataSource: MatTableDataSource<any[]>;
  carga = true;
  noData = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private FormacionService: FormacionService,
    private TitleService: TitleService,
    private alerta: AlertsService,
    private router: Router
  ) {
    this.TitleService.setTitle(this.title);
    this.FormacionService.ObtenerFormaciones().subscribe((data: {}) => {
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
          this.FormacionService.EliminarFormacion(element).subscribe(
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
      this.router.navigate(['/admin/formacion/actualizar/' + element]);
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
