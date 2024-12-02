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
import { ClientMessages } from '../../app/shared/utils/messages';

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
    if (this.clientStore.totalClients() === 0) {
      this.loadClients();
    }
  }

  public addOrRemoveFavorityList(client: Client): void {
    const isFavorite = this.clientStore.favoriteClients().some(c => c.id === client.id);
    if (isFavorite) {
      if (client.id) {
        this.clientStore.removeFromFavorites(client.id);
        this._snackbarSvc.show('Cliente removido da lista de favoritos')
      } else {
        console.warn('Cliente não possui um ID válido para remoção');
      }
    } else {
      this.clientStore.addToFavorites(client)
      this._snackbarSvc.show('Cliente Adicionado a lista de favoritos')
    }
  }

  public confirmAndRemoveClient(client: Client): void {
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

  public openDialog(mode: 'create' | 'edit' | 'remove', client?: Client): void {
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


  private createClient(clientData: Client): void {
    this.clientStore.createClient(clientData);
    this.handleClientOperation(
      ClientMessages.SUCCESS.CREATE,
      ClientMessages.ERROR.CREATE
    );
  }

  private loadClients(): void {
    this.clientStore.getClients();
  }

  private updateClient(clientUpdateData: Client): void {
    if (clientUpdateData.id) {
      this.clientStore.updateClient({
        clientId: clientUpdateData.id,
        clientUpdateData: clientUpdateData
      });
      this.handleClientOperation(
        ClientMessages.SUCCESS.UPDATE,
        ClientMessages.ERROR.UPDATE
      );
    }
  }

  private removeClient(client: Client): void {
    if (client.id) {
      this.clientStore.removeClient(client.id);
      this.handleClientOperation(
        ClientMessages.SUCCESS.REMOVE,
        ClientMessages.ERROR.REMOVE
      );
    }
  }

  private cleanFavoriteList(): void {
    if (this.clientStore.totalFavoriteClients() === 0) {
      this.router.navigate(['/dashboard'])
      this._snackbarSvc.show('Lista não possui clientes')
      return
    }
    this.clientStore.cleanFavorites()
    this.handleClientOperation(
      ClientMessages.SUCCESS.CLEAN_FAVORITES,
      ClientMessages.ERROR.CLEAN_FAVORITES,
    )
    this.router.navigate(['/dashboard'])
  }

  private handleClientOperation(
    sucessMessage: string,
    errorMessage: string): Subscription {
    return interval(100).pipe(
      switchMap(async () => this.clientStore.loading()),
      first(loading => !loading),
      switchMap(async () => {
        this._snackbarSvc.show(sucessMessage)
        return of(null);
      }),
      catchError(err => {
        this._snackbarSvc.show(errorMessage);
        return of(null)
      })
    ).subscribe()
  }



}
