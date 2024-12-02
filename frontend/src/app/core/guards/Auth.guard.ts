import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/AuthStore';
import { interval, switchMap, first } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore)
  const router = inject(Router)

  return interval(100).pipe(
    switchMap(async () => authStore.loading()),
    first(loading => !loading),
    switchMap(async () => {
      const isLoggedIn = authStore.isLoggedIn();
      if ((isLoggedIn && state.url === '/home') ||
        (!isLoggedIn && (state.url === '/dashboard' || state.url === '/clientlist'))) {
        router.navigate(isLoggedIn ? ['/dashboard'] : ['/home']);
        return false;
      }
      return true;
    })
  );
};
