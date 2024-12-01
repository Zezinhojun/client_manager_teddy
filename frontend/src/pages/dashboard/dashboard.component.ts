import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../app/core/stores/AuthStore';

import { ClientCardComponent } from "../../app/core/components/client-card/client-card.component";
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';
import { ClientStore } from '../../app/core/stores/ClientStore';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule,
    ClientCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  authStore = inject(AuthStore)
  clientStore = inject(ClientStore)


  ngOnInit(): void {
    this.loadClients()
  }

  private loadClients() {
    this.clientStore.getClients();
  }

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
