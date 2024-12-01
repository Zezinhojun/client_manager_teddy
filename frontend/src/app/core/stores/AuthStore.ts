import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/Auth-service/Auth.service';
import { tapResponse } from '@ngrx/operators';

export type CacheResponse = {
  value: string;
};

export interface AuthState {
  username: string | null;
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  username: null,
  loading: false,
  error: null
}

export const AuthStore = signalStore(

  { providedIn: 'root' },
  withState(initialAuthState),
  withComputed(({ username, error }) => ({
    isLoggedIn: computed(() => { return !!username() }),
    hasError: computed(() => error() !== null),
  })),

  withMethods((store, _authSvc = inject(AuthService)) => ({

    setCache: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((username) =>
          _authSvc.setCache({ value: username }).pipe(
            tapResponse({
              next: (result: boolean) => {
                patchState(store, {
                  username: result ? username : null,
                  loading: false,
                  error: result ? null : 'Error setting cache'
                });
              },
              error: (err: Error) => {
                patchState(store, {
                  loading: false,
                  error: err.message || 'Error setting cache'
                });
              }
            })
          )
        )
      )
    ),

    validateCache: rxMethod<void>(
      pipe(
        tap(() => { patchState(store, { loading: true }) }),
        switchMap(() =>
          _authSvc.getCache()
            .pipe(
              tapResponse({
                next: (result: CacheResponse | null) => {
                  if (result?.value) {
                    patchState(store, {
                      username: result.value,
                      loading: false,
                      error: null
                    })
                  } else {
                    patchState(store, {
                      username: null,
                      loading: false,
                      error: 'Invalid session'
                    })
                  }
                },
                error: (err: Error) => {
                  patchState(store, {
                    username: null,
                    loading: false,
                    error: err.message || 'Error loading cache'
                  });
                }
              })
            ))
      )
    ),

    logout: rxMethod<void>(
      pipe(
        tap(() => {
          console.log('Logout iniciado');
          patchState(store, { loading: true })
        }
        ),
        switchMap(() => {
          return _authSvc.deleteCache()
            .pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    username: null,
                    loading: false,
                    error: 'logout error'
                  })
                },
                error: (err: Error) => {
                  patchState(store, {
                    loading: false,
                    error: err.message || 'Logout error'
                  })
                }
              })
            )
        })
      )
    )
  })),
  withHooks({
    onInit(store) {
      store.validateCache();
    },
  }),
);
