import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Client } from '../../stores/ClientStore';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly _http = inject(HttpClient)
  private readonly apiUrl: string = environment.apiUrl

  getClients() {
    return this._http.get<Client[]>(`${this.apiUrl}/clients`)
  }

  removeClient(clientId: string) {
    return this._http.delete(`${this.apiUrl}/clients/${clientId}`)
  }
}
