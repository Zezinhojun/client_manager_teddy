import { Component, inject } from '@angular/core';
import { AuthStore, ClientStore } from '../../app/core/store';

import { ClientCardComponent } from "../../app/core/components/client-card/client-card.component";
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule,
    ClientCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  authStore = inject(AuthStore)
  clientStore = inject(ClientStore)

  handleAction(action: string) {
    switch (action) {
      case 'add':
        console.log("Clicado add")
        return
      case 'edit':
        console.log("Clicado edit")
        return
      case 'remove':
        console.log("Clicado remove")
        return
      default:
        console.log("CLICK ERRADO")
        return
    }
  }
}
