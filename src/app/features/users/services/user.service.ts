import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import {
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest
} from '../models/user-request.model';
import {
  GenericResponse,
  GetUserByIdResponse,
  GetUsersResponse
} from '../models/user-response.model';
import { environment } from '../../../../environments/environment';
import { UsersApiEnum } from '../../../core/enums/users-api.enum';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getUsers(params: Record<string, any>): Observable<GetUsersResponse | User[]> {
    return this.http.get<GetUsersResponse | User[]>(`${this.baseUrl}/${UsersApiEnum.BASE}`, { params });
  }

  public getUserById(id: number): Observable<GetUserByIdResponse> {
    return this.http.get<GetUserByIdResponse>(`${this.baseUrl}/${UsersApiEnum.BY_ID}/${id}`);
  }

  public createUser(data: CreateUserRequest): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.baseUrl}/${UsersApiEnum.CREATE}`, data);
  }

  public updateUser(data: UpdateUserRequest): Observable<GenericResponse> {
    return this.http.put<GenericResponse>(`${this.baseUrl}/${UsersApiEnum.UPDATE}`, data);
  }

  public deleteUser(data: DeleteUserRequest): Observable<GenericResponse> {
    return this.http.request<GenericResponse>('delete', `${this.baseUrl}/${UsersApiEnum.DELETE}`, {
      body: data
    });
  }
}
