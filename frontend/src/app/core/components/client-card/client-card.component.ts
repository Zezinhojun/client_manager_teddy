import { Component, input, output } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { Client } from '../../stores/ClientStore';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {
  isFavorite = input<(client: Client) => boolean>(() => false);
  totalClients = input<number>()
  clients = input<Client[]>([])
  onAddClick = output<Client>()
  onEditClick = output<Client>()
  onRemoveClick = output<Client>()
  isFavoriteRoute = input<boolean>(false)
}
