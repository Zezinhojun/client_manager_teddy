import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { MenuItens, NavbarComponent } from '../navbar/navbar.component';
import { AuthStore } from '../../app/core/store';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  authStore = inject(AuthStore)
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
        break
      case 'clientsList':
        console.log('clientsList');
        break;
      case 'logout':
        console.log('logout');
        break;
      default:
        console.log("Escolha uma opção certa")
    }
  }

  onSideMenuToggle(): void {
    this.toogleMenu.update(state => !state);
  }
}
