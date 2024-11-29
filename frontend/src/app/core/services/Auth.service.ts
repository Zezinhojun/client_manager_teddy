import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CacheResponse } from '../store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient)
  private readonly apiUrl: string = "http://localhost:3000/cache"

  getCache() {
    return this._http.get<CacheResponse | null>(this.apiUrl)
  }

  setCache(payload: { value: string }) {
    return this._http.post<boolean>(this.apiUrl, payload)
  }

}
