import { computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { signalStore, withState, withComputed, withMethods, patchState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, tap, switchMap, map } from "rxjs";
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
  favoriteClients: Client[]
  error: string | null;
}

export type ClientUpdateInput = {
  clientId: string,
  clientUpdateData: Client
}

const initialClientState: ClientState = {
  clients: [],
  favoriteClients: [],
  loading: false,
  error: null,
};

export const ClientStore = signalStore(
  { providedIn: 'root' },
  withState(initialClientState),
  withComputed(({ clients, error, favoriteClients }) => ({
    totalClients: computed(() => clients().length),
    totalFavoriteClients: computed(() => favoriteClients().length),
    hasError: computed(() => error() !== null)

  })),
  withMethods((store, _clientSvc = inject(ClientService)) => ({
    cleanFavorites() {
      patchState(store, {
        favoriteClients: []
      })
    },

    addToFavorites(client: Client) {
      patchState(store, {
        favoriteClients: [...store.favoriteClients(), client]
      })
    },

    removeFromFavorites(clientId: string) {
      patchState(store, {
        favoriteClients: store.favoriteClients().filter(client => client.id !== clientId)
      })
    },

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

    createClient: rxMethod<Client>(
      pipe(
        tap(() => {
          patchState(store, { loading: true });
        }),
        switchMap((clientData) =>
          _clientSvc.createClient(clientData).pipe(
            tapResponse({
              next: (createdClient: Client) => {
                patchState(store, {
                  clients: [...store.clients(), createdClient],
                  loading: false,
                  error: null
                });
              },
              error: (err: Error) => {
                patchState(store, {
                  loading: false,
                  error: err.message || 'Erro ao criar cliente'
                });
              }
            })
          )
        )
      )
    ),
    updateClient: rxMethod<ClientUpdateInput>(
      pipe(
        tap(() => {
          patchState(store, { loading: true });
        }),
        switchMap(({ clientId, clientUpdateData }) =>
          _clientSvc.updateClient(clientId, clientUpdateData).pipe(
            map((updatedClient: Client) => {
              return store.clients().map(client =>
                client.id === clientId ? updatedClient : client
              );
            }),
            tapResponse({
              next: (updatedClient: Client[]) => {
                patchState(store, {
                  clients: updatedClient,
                  loading: false,
                  error: null
                });
              },
              error: (err: Error) => {
                patchState(store, {
                  loading: false,
                  error: err.message || 'Erro ao atualizar cliente'
                });
              }
            })
          )
        )
      )
    ),
  }))
)



