import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../app/core/stores/AuthStore';
import { ClientCardComponent } from "../../app/core/components/client-card/client-card.component";
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';
import { Client, ClientStore } from '../../app/core/stores/ClientStore';
import { DialogComponent } from '../../app/core/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, first, interval, of, Subscription, switchMap } from 'rxjs';
import { SnackbarService } from '../../app/core/services/Snackbar-service/snackbar.service';
import { ConfirmDialogComponent } from '../../app/core/components/confirm-dialog/confirm-dialog.component';

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
  public authStore = inject(AuthStore)
  public clientStore = inject(ClientStore)

  ngOnInit(): void {
    this.loadClients()
  }

  removeClient(client: Client): void {
    if (client.id) {
      this.clientStore.removeClient(client.id);
      this.handleClientOperation(
        'Cliente removido com sucesso!',
        'Erro ao remover cliente. Tente novamente.'
      );
    }
  }

  confirmAndRemoveClient(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: '150px',
      data: {
        clientUsername: client.name,
        buttonTitle: 'Excluir cliente',
        dialogTitle: 'Excluir cliente',
        isConfirm: true
      },
      panelClass: 'custom-modalBox'
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.removeClient(client)
      }
    })

  }
  openDialog(mode: 'create' | 'edit', client?: Client): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: mode === 'create' ? 'Criar cliente' : 'Editar cliente',
        buttonTitle: mode === 'create' ? 'Criar cliente' : 'Editar cliente',
        client: mode === 'edit' ? client : null,
        isEdit: mode === 'edit'
      },
      panelClass: 'custom-modalBox'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        mode === 'create' ? this.createClient(result) : this.updateClient(result)
      }
    })
  }

  private loadClients(): void {
    this.clientStore.getClients();
  }

  private createClient(clientData: Client): void {
    this.clientStore.createClient(clientData);
    this.handleClientOperation(
      'Cliente criado com sucesso!',
      'Erro ao criar cliente. Tente novamente.'
    );
  }

  private updateClient(clientUpdateData: Client) {
    if (clientUpdateData.id) {
      this.clientStore.updateClient({
        clientId: clientUpdateData.id,
        clientUpdateData: clientUpdateData
      });
      this.handleClientOperation(
        'Cliente atualizado com sucesso!',
        'Erro ao atualizar cliente. Tente novamente.'
      );
    }
  }

  private handleClientOperation(
    sucessMessage: string,
    errorMessage: string): Subscription {
    return interval(100).pipe(
      switchMap(async () => this.clientStore.loading()),
      first(loading => !loading),
      switchMap(async () => {
        this._snackbarSvc.show(sucessMessage, 'Fechar')
        return of(null);
      }),
      catchError(err => {
        this._snackbarSvc.show(errorMessage, 'Fechar');
        return of(null)
      })
    ).subscribe()
  }
}
