import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { AttractionsService } from '../../services/attractions.service';
import { MsgService } from '../../../../shared/services/Message/msg.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

import { Attraction, GetAttractionsResponse } from '../../models/attraction-response.model';
import { AttractionFormComponent } from '../attraction-form-dialog/attraction-form-dialog.component';

@Component({
  selector: 'app-attraction-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './attraction-list.component.html',
  styleUrls: ['./attraction-list.component.scss']
})
export class AttractionListComponent implements OnInit, OnDestroy {
  private readonly searchSubject = new Subject<string>();
  private readonly unsubscribe$ = new Subject<void>();

  public readonly displayedColumns: string[] = ['id', 'coverimage', 'name', 'latitude', 'longitude', 'actions'];
  public readonly dataSource = new MatTableDataSource<Attraction>();

  public searchTerm:string = '';
  public pageIndex:number = 0;
  public pageSize:number = 10;
  public totalItems:number | undefined = 0;
  public sortColumn:string = 'id';
  public sortOrder: 'asc' | 'desc' = 'asc';
  public loading:boolean = false;

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  constructor(
    private readonly attractionService: AttractionsService,
    private readonly dialog: MatDialog,
    private readonly msgService: MsgService
  ) {}

  public ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.unsubscribe$)).subscribe(() => {
      this.pageIndex = 0;
      this.loadAttractions();
    });

    this.loadAttractions();
  }

  public loadAttractions(): void {
    this.loading = true;

    const params: Record<string, any> = {
      page: this.pageIndex + 1,
      per_page: this.pageSize,
      sort_column: this.sortColumn,
      sort_order: this.sortOrder,
      ...(this.searchTerm && { search: this.searchTerm })
    };

    this.attractionService.getAttractions(params).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: GetAttractionsResponse | Attraction[]): void => {
        if (Array.isArray(res)) {
          this.dataSource.data = res;
          this.totalItems = res.length;
        } else {
          this.dataSource.data = res.data;
          this.totalItems = res.total;
        }
        this.loading = false;
      },
      error: (): void => {
        this.loading = false;
      }
    });
  }

  public onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  public clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAttractions();
  }

  public onSortChange(event: Sort): void {
    this.sortColumn = event.active;
    this.sortOrder = event.direction || 'asc';
    this.loadAttractions();
  }

  public onAddAttraction(): void {
    const dialogRef = this.dialog.open(AttractionFormComponent, {
      width: '700px',
      height: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) this.loadAttractions();
    });
  }

  public onEditAttraction(id: number): void {
    const dialogRef = this.dialog.open(AttractionFormComponent, {
      width: '700px',
      height: '450px',
      data: { id }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) this.loadAttractions();
    });
  }

  public onDeleteAttraction(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this attraction?' }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.attractionService.deleteAttraction({ id }).pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: (res) => {
            this.msgService.showSuccess(res.message || 'Attraction deleted successfully');
            this.loadAttractions();
          },
          error: (err) => {
            const errorMsg = err?.error?.message || 'Failed to delete attraction';
            this.msgService.showError(errorMsg);
          }
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
