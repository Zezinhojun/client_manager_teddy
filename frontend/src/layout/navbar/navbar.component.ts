import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

export type MenuItens = { label: string, active: boolean, action: string }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    CommonModule,
    MatGridListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItemClick = output<string>();
  sideMenu = output<boolean>();
  username = input<string | null>(null);
  navItens = input<MenuItens[]>([])
}

