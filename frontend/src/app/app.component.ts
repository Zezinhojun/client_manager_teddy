import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './core/stores/AuthStore';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public authStore = inject(AuthStore)
  title = 'client-manager-teddy';
}
