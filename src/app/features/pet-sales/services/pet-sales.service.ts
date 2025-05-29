import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WeeklySalesResponse, DailySalesResponse } from '../models/pet-sales-response.model';
import { PetSalesApiEnum } from '../../../core/enums/pet-sales-api.enum';

@Injectable({
  providedIn: 'root'
})
export class PetSalesService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getWeeklySales(date: string): Observable<WeeklySalesResponse> {
    const url = `${this.baseUrl}/${PetSalesApiEnum.WEEKLY_SALES}/${date}`;
    return this.http.get<WeeklySalesResponse>(url);
  }

  public getDailySales(date: string): Observable<DailySalesResponse> {
    const url = `${this.baseUrl}/${PetSalesApiEnum.DAILY_SALES}/${date}`;
    return this.http.get<DailySalesResponse>(url);
  }
}
