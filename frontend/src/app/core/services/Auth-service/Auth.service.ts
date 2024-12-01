import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CacheResponse } from '../../stores/AuthStore';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient)
  private readonly apiUrl: string = environment.apiUrl

  getCache() {
    return this._http.get<CacheResponse | null>(`${this.apiUrl}/cache`)
  }

  setCache(payload: { value: string }) {
    return this._http.post<boolean>(`${this.apiUrl}/cache`, payload)
  }

  deleteCache() {
    return this._http.delete<boolean>(`${this.apiUrl}/cache`)
  }
}
