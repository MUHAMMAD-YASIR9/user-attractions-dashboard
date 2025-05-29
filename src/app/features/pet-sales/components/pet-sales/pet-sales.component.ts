import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { PetSalesService } from '../../services/pet-sales.service';
import { DailySalesItem } from '../../models/pet-sales-response.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { Subject, takeUntil } from 'rxjs';
import * as Highcharts from 'highcharts';
import moment from 'moment';

@Component({
  selector: 'app-pet-sales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    ChartModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './pet-sales.component.html',
  styleUrl: './pet-sales.component.scss'
})
export class PetSalesComponent implements OnInit {
  public searchTerm: string = '';
  public dataSource = new MatTableDataSource<DailySalesItem>();
  public displayedColumns: string[] = ['date', 'animal', 'price'];
  public totalItems = 0;
  public pageSize = 10;
  public pageIndex = 0;

  private readonly unsubscribe$ = new Subject<void>();
  public weeklyChart!: Chart;
  public selectedDate: string = new Date().toISOString().split('T')[0];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly petSalesService = inject(PetSalesService);

  ngOnInit(): void {
    this.loadWeeklyChart();
    this.loadDailySales();
  }

  public loadWeeklyChart(): void {
    this.petSalesService.getWeeklySales(moment(this.selectedDate).format('YYYY-MM-DD')).pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.weeklyChart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Weekly Pet Sales'
        },
        xAxis: {
          categories: res.categories
        },
        yAxis: {
          title: {
            text: 'Sales'
          }
        },
        series: res.series.map((item): Highcharts.SeriesLineOptions => ({
          name: item.name,
          data: item.data,
          type: 'line'
        }))
      });
    });
  }

  public loadDailySales(): void {
    this.petSalesService.getDailySales(moment(this.selectedDate).format('YYYY-MM-DD')).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: DailySalesItem[]) => {
        this.dataSource.data = res;
        this.totalItems = res.length;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  public onSearch(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  public clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  public onDateChange(): void {
    this.loadWeeklyChart();
    this.loadDailySales();
  }
  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
