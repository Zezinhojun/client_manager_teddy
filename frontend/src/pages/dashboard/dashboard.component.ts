import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../app/core/stores/AuthStore';
import { ClientCardComponent } from "../../app/core/components/client-card/client-card.component";
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';
import { ClientStore } from '../../app/core/stores/ClientStore';
import { DialogComponent } from '../../app/core/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  private readonly dialog = inject(MatDialog)
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
        this.openDialog()
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
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { title: 'Criar cliente', buttonTitle: "Criar cliente" },
      panelClass: 'custom-modalBox',
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Formulário recebido:', result);
      }
    });
  }
}
