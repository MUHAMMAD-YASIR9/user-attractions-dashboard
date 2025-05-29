import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { AuthApi } from '../../core/enums/auth-api.enum';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  public login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}${AuthApi.LOGIN}`,
      payload
    ).pipe(
      tap((res: LoginResponse) => {
        if (res.status === 'ok') {
          sessionStorage.setItem('token', res.accessToken);
          // optionally store user info
          sessionStorage.setItem('user', JSON.stringify(res.user));
        }
      })
    );
  }

  public logout(): void {
    sessionStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
