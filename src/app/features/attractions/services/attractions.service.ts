import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttractionsApiEnum } from '../../../core/enums/attractions-api.enum';
import { CreateAttractionRequest, UpdateAttractionRequest, DeleteAttractionRequest } from '../models/attraction-request.model';
import { GetAttractionsResponse, GetAttractionByIdResponse, CreateUpdateAttractionResponse, DeleteAttractionResponse } from '../models/attraction-response.model';
import { environment } from '../../../../environments/environment';

export interface GetAttractionsParams {
  search?: string;
  page?: number;
  per_page?: number;
  sort_column?: string;
  sort_order?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  constructor(private readonly http: HttpClient) {}
    private readonly baseUrl = environment.apiUrl;

  public getAttractions(params?: GetAttractionsParams): Observable<GetAttractionsResponse> {
    return this.http.get<GetAttractionsResponse>(`${this.baseUrl}/${AttractionsApiEnum.LIST}`, {
      params: params as any
    });
  }

  public getAttractionById(id: number): Observable<GetAttractionByIdResponse> {
    return this.http.get<GetAttractionByIdResponse>(`${this.baseUrl}/${AttractionsApiEnum.DETAIL}/${id}`);
  }

  public createAttraction(payload: CreateAttractionRequest): Observable<CreateUpdateAttractionResponse> {
    return this.http.post<CreateUpdateAttractionResponse>(`${this.baseUrl}/${AttractionsApiEnum.CREATE}`, payload);
  }

  public updateAttraction(payload: UpdateAttractionRequest): Observable<CreateUpdateAttractionResponse> {
    return this.http.put<CreateUpdateAttractionResponse>(`${this.baseUrl}/${AttractionsApiEnum.UPDATE}`, payload);
  }

  public deleteAttraction(payload: DeleteAttractionRequest): Observable<DeleteAttractionResponse> {
    return this.http.request<DeleteAttractionResponse>('delete', `${this.baseUrl}/${AttractionsApiEnum.DELETE}`, {
      body: payload
    });
  }
}
