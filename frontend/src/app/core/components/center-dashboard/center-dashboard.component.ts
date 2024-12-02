import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-center-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './center-dashboard.component.html',
  styleUrl: './center-dashboard.component.css'
})
export class CenterDashboardComponent {
  totalClients = input<number>()
  openDialog = output<"create" | "edit" | "remove">()
  isFavoriteRoute = input<boolean>()
}
