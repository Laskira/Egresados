import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { rowsAnimation } from 'src/app/material/table.animation';
import Swal from 'sweetalert2';
import { AlertsService } from 'src/app/services/alerts.service';
import { TitleService } from 'src/app/services/title.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.scss'],
  animations: [rowsAnimation],
})
export class ListAdminComponent implements OnInit {

  title = 'Ver Administradores';

  columns = [
    {
      columnDef: 'Documento',
      header: 'Cédula',
      cell: (row: any) => `${row.Documento}`
    },
    {
      columnDef: 'Nombres',
      header: 'Nombres',
      cell: (row: any) => `${row.Nombres}`
    },
    {
      columnDef: 'P_Apellido',
      header: 'Primer apellido',
      cell: (row: any) => `${row.P_Apellido}`
    },
    {
      columnDef: 'S_Apellido',
      header: 'Segundo apellido',
      cell: (row: any) => `${row.S_Apellido}`
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
    private titleService: TitleService,
    private alerta: AlertsService,
    private router: Router,
    private adminService: AdminService

  ) {
    this.titleService.setTitle(this.title);

    this.adminService.ObtenerAdmins().subscribe((data: {}) => {
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
          this.adminService.EliminarAdmin(element).subscribe(
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

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
