import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../app/core/stores/AuthStore';
import { ClientCardComponent } from "../../app/core/components/client-card/client-card.component";
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';
import { Client, ClientStore } from '../../app/core/stores/ClientStore';
import { DialogComponent } from '../../app/core/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, first, interval, of, switchMap } from 'rxjs';
import { SnackbarService } from '../../app/core/services/Snackbar-service/snackbar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AngularMaterialModule,
    ClientCardComponent,
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  private readonly dialog = inject(MatDialog)
  private readonly _snackbarSvc = inject(SnackbarService)
  authStore = inject(AuthStore)
  clientStore = inject(ClientStore)


  ngOnInit(): void {
    this.loadClients()
  }

  private loadClients() {
    this.clientStore.getClients();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Criar cliente',
        buttonTitle: "Criar cliente",
      },
      panelClass: 'custom-modalBox',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createClient(result)
      }
    });
  }

  openEditDialog(client: Client): void {
    const isEdit = !!client.id
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Editar cliente',
        buttonTitle: "Editar cliente",
        client: client,
        isEdit: isEdit
      },
      panelClass: 'custom-modalBox',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateClient(result)
      }
    });
  }

  removeClient(client: Client) {
    if (client.id) {
      this.clientStore.removeClient(client.id)
      interval(100).pipe(
        switchMap(async () => this.clientStore.loading()),
        first(loading => !loading),
        switchMap(async () => {
          this._snackbarSvc.show('Cliente removido com sucesso!', 'Fechar');
          return of(null);
        }),
        catchError(err => {
          this._snackbarSvc.show('Erro ao remover cliente. Tente novamente.', 'Fechar')
          return of(null);
        })
      )
        .subscribe()
    }
  }

  private createClient(clientData: Client) {
    this.clientStore.createClient(clientData)
    interval(100).pipe(
      switchMap(async () => this.clientStore.loading()),
      first(loading => !loading),
      switchMap(async () => {
        this._snackbarSvc.show('Cliente criado com sucesso!', 'Fechar')
        return of(null)
      }),
      catchError(err => {
        this._snackbarSvc.show('Erro ao criar cliente. Tente novamente.', 'Fechar')
        return of(null)
      })
    )
      .subscribe()
  }

  private updateClient(clientUpdateData: Client) {
    if (clientUpdateData.id) {
      this.clientStore.updateClient({
        clientId: clientUpdateData.id,
        clientUpdateData: clientUpdateData
      })
      interval(100).pipe(
        switchMap(async () => this.clientStore.loading()),
        first(loading => !loading),
        switchMap(async () => {
          this._snackbarSvc.show('Cliente atualizado com sucesso!', 'Fechar')
          return of(null)
        }),
        catchError(err => {
          this._snackbarSvc.show('Erro ao atualizar cliente. Tente novamente.', 'Fechar')
          return of(null)
        })
      )
        .subscribe()
    }

  }


}
