import { Component, inject } from '@angular/core';
import { AuthStore } from '../../app/core/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  authStore = inject(AuthStore)
}
