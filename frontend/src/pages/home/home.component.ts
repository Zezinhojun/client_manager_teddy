import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AuthStore } from '../../app/core/store';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  public authStore = inject(AuthStore)
  public router = inject(Router)

  defineCache() {
    this.authStore.setCache('lucas');
    interval(100).pipe(
      switchMap(() => {
        if (this.authStore.isLoggedIn()) {
          return this.router.navigate(['/dashboard']);
        }
        return this.router.navigate(['/home']);
      })
    ).subscribe();
  }
}
