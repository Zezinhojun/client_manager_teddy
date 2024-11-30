import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItens, NavbarComponent } from '../navbar/navbar.component';
import { AuthStore } from '../../app/core/store';
import { first, interval, of, switchMap } from 'rxjs';
import { SnackbarService } from '../../app/core/services/Snackbar-service/snackbar.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  authStore = inject(AuthStore)
  _snackbarSvc = inject(SnackbarService)
  router = inject(Router)
  toogleMenu = signal<boolean>(false)
  navItens = signal<MenuItens[]>([
    {
      label: 'Clientes', active: true, action: 'clients'
    },
    {
      label: 'Clientes selecionados', active: false, action: 'clientsList'
    },
    {
      label: 'Sair', active: false, action: 'logout'
    },
  ])

  onMenuClick(action: string) {
    this.navItens.update(items =>
      items.map(item => ({
        ...item,
        active: item.action === action
      }))
    );
    switch (action) {
      case 'clients':
        console.log('clients')
        return
      case 'clientsList':
        console.log('clientsList');
        return
      case 'logout':
        return this.handleLogout().subscribe({
          next: success => {
            if (success) {
              this.router.navigate(['/home'])
            }
          },
          error: (err) => {
            console.error('Logout process error', err);
          }
        })
      default:
        console.log("Escolha uma opção certa")
        return
    }
  }

  onSideMenuToggle(): void {
    this.toogleMenu.update(state => !state);
  }

  private handleLogout() {
    this.authStore.logout()
    return interval(100).pipe(
      switchMap(async () => this.authStore.loading()),
      first(loading => !loading),
      switchMap(() => {
        if (!this.authStore.isLoggedIn()) {
          this._snackbarSvc.show('Logout realizado com sucesso', 'Fechar');
          return of(true);
        } else {
          this._snackbarSvc.show('Erro ao realizar logout', 'Fechar');
          return of(false);
        }
      }),
    )
  }
}
