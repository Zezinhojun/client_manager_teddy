import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { AuthStore } from '../../app/core/stores/AuthStore';
import { ClientCardComponent } from "../../app/core/components/client-card/client-card.component";
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';
import { Client, ClientStore } from '../../app/core/stores/ClientStore';
import { DialogComponent } from '../../app/core/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, first, interval, of, Subscription, switchMap } from 'rxjs';
import { SnackbarService } from '../../app/core/services/Snackbar-service/snackbar.service';
import { ConfirmDialogComponent } from '../../app/core/components/confirm-dialog/confirm-dialog.component';
import { CenterDashboardComponent } from "../../app/core/components/center-dashboard/center-dashboard.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AngularMaterialModule,
    ClientCardComponent,
    CenterDashboardComponent
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  private readonly dialog = inject(MatDialog)
  private readonly _snackbarSvc = inject(SnackbarService)
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  public authStore = inject(AuthStore)
  public clientStore = inject(ClientStore)
  public isFavoriteRoute = signal<boolean>(false)
  public isFavorite = computed(() =>
    (client: Client) => this.clientStore.favoriteClients().some(c => c.id === client.id)
  )
  public currentClients = computed(() =>
    this.isFavoriteRoute()
      ? this.clientStore.favoriteClients()
      : this.clientStore.clients()
  );

  public totalClients = computed(() =>
    this.isFavoriteRoute()
      ? this.clientStore.totalFavoriteClients()
      : this.clientStore.totalClients()
  );


  ngOnInit(): void {
    this.isFavoriteRoute.set(this.route.snapshot.url[0]?.path === 'clientlist');
    if (this.clientStore.clients().length === 0) {
      this.loadClients();
    }
  }

  addOrRemoveFavorityList(client: Client): void {
    const isFavorite = this.clientStore.favoriteClients().some(c => c.id === client.id);
    if (isFavorite) {
      if (client.id) {
        this.clientStore.removeFromFavorites(client.id);
      } else {
        console.warn('Cliente não possui um ID válido para remoção');
      }
    } else {
      this.clientStore.addToFavorites(client)
    }
  }

  removeClient(client: Client): void {
    if (client.id) {
      this.clientStore.removeClient(client.id);
      this.handleClientOperation(
        'Cliente excluído com sucesso!',
        'Erro ao excluir cliente. Tente novamente.'
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


  openDialog(mode: 'create' | 'edit' | 'remove', client?: Client): void {

    if (mode === 'remove') return this.cleanFavoriteList()

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
      'Cliente adicionado com sucesso!',
      'Erro ao adicionar cliente. Tente novamente.'
    );
  }

  private updateClient(clientUpdateData: Client): void {
    if (clientUpdateData.id) {
      this.clientStore.updateClient({
        clientId: clientUpdateData.id,
        clientUpdateData: clientUpdateData
      });
      this.handleClientOperation(
        'Dados do cliente atualizados com sucesso!',
        'Erro ao atualizar dados do cliente. Tente novamente.'
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

  private cleanFavoriteList(): void {
    if (this.clientStore.totalFavoriteClients() === 0) {
      this.router.navigate(['/dashboard'])
      this._snackbarSvc.show('Lista não possui clientes', 'Fechar')
      return
    }
    this.clientStore.cleanFavorites()
    this.handleClientOperation(
      'Favoritos limpos com sucesso!',
      "Erro ao limpar favoritos. Tente novamente."
    )
    this.router.navigate(['/dashboard'])
  }

}
