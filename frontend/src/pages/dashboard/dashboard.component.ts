import { Component, inject } from '@angular/core';
import { AuthStore, ClientStore } from '../../app/core/store';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatGridListModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  authStore = inject(AuthStore)
  clientStore = inject(ClientStore)
  rowHeight = `calc(100vh - 100px)`;

  onAddClick() {
    console.log("Clicado")
  }
}
