import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore)
  const router = inject(Router)

  if ((authStore.isLoggedIn() && state.url === '/home') ||
    (!authStore.isLoggedIn() && state.url === '/dashboard')) {
    router.navigate(authStore.isLoggedIn() ? ['/dashboard'] : ['/home']);
    return false;
  }
  return true;
};
