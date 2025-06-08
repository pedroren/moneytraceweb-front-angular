//Auth service for managing user authentication and authorization, TBD
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';     


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}