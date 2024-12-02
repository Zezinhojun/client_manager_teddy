import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuItens, NavbarComponent } from '../navbar/navbar.component';
import { AuthStore } from '../../app/core/stores/AuthStore';
import { filter, first, interval, Observable, of, Subscription, switchMap } from 'rxjs';
import { SnackbarService } from '../../app/core/services/Snackbar-service/snackbar.service';
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';
import { ClientMessages } from '../../app/shared/utils/messages';
import { ClientStore } from '../../app/core/stores/ClientStore';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularMaterialModule,
    NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export default class MainLayoutComponent implements OnInit {
  private readonly _snackbarSvc = inject(SnackbarService)
  private readonly router = inject(Router)
  private readonly toogleMenu = signal<boolean>(false)
  public authStore = inject(AuthStore)
  private readonly clientStore = inject(ClientStore)
  public navItens = signal<MenuItens[]>([
    {
      label: 'Clientes', active: true, action: 'clients'
    },
    {
      label: 'Clientes selecionados', active: false, action: 'clientslist'
    },
    {
      label: 'Sair', active: false, action: 'logout'
    },
  ])

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveNavItem()
    })
  }

  public onLogoClick() {
    this.router.navigate(['/dashboard'])
  }

  public updateActiveNavItem(): void {
    this.navItens.update(items =>
      items.map(item => ({
        ...item,
        active: this.isItemActive(item.action, this.router.url)
      }))
    )
  }

  public onMenuClick(action: string): Subscription | undefined {
    this.navItens.update(items =>
      items.map(item => ({
        ...item,
        active: item.action === action
      }))
    );
    switch (action) {
      case 'clients':
        this.router.navigate(['/dashboard'])
        return
      case 'clientslist':
        this.router.navigate(['/clientlist'])
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

  public onSideMenuToggle(): void {
    this.toogleMenu.update(state => !state);
  }

  private handleLogout(): Observable<boolean> {
    this.authStore.logout()
    return interval(10).pipe(
      switchMap(async () => this.authStore.loading()),
      first(loading => !loading),
      switchMap(() => {
        if (!this.authStore.isLoggedIn()) {
          this.clientStore.cleanFavorites()
          this._snackbarSvc.show(ClientMessages.SUCCESS.LOGOUT);
          return of(true);
        } else {
          this._snackbarSvc.show(ClientMessages.ERROR.LOGOUT);
          return of(false);
        }
      }),
    )
  }

  private isItemActive(action: string, currentUrl: string): boolean {
    switch (action) {
      case 'clients':
        return currentUrl === '/dashboard';
      case 'clientslist':
        return currentUrl === '/clientlist';
      default:
        return false
    }
  }

}
