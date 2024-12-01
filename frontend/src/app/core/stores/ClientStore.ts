import { computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { signalStore, withState, withComputed, withMethods, patchState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, tap, switchMap } from "rxjs";
import { ClientService } from "../services/Client-service/client.service";

export interface Client {
  id?: string
  name: string;
  salary: string;
  companyValue: string
}

interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialClientState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

export const ClientStore = signalStore(
  { providedIn: 'root' },
  withState(initialClientState),
  withComputed(({ clients, error }) => ({
    totalClients: computed(() => clients().length),
    hasError: computed(() => error() !== null)

  })),
  withMethods((store, _clientSvc = inject(ClientService)) => ({

    getClients: rxMethod<void>(
      pipe(
        tap(() => { patchState(store, { loading: true }) }),
        switchMap(() =>
          _clientSvc.getClients()
            .pipe(
              tapResponse({
                next: (result: Client[]) => {
                  patchState(store, {
                    clients: result,
                    loading: false,
                    error: null
                  })
                },
                error: (err: Error) => {
                  patchState(store, {
                    clients: [],
                    loading: false,
                    error: err.message || 'Error loading client'
                  })
                }
              })
            )
        )
      )
    ),

    removeClient: rxMethod<string>(
      pipe(
        tap(() => {
          patchState(store, { loading: true });
        }),
        switchMap((clientId) =>
          _clientSvc.removeClient(clientId).pipe(
            tapResponse({
              next: () => {
                patchState(store, {
                  clients: store.clients().filter(client => client.id !== clientId),
                  loading: false,
                  error: null
                });
              },
              error: (err: Error) => {
                patchState(store, {
                  loading: false,
                  error: err.message || 'Erro ao remover cliente'
                });
              }
            })
          )
        )
      )
    ),

  }))

)
