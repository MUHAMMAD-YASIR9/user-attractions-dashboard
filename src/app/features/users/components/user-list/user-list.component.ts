import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { GetUsersResponse } from '../../models/user-response.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MsgService } from '../../../../shared/services/Message/msg.service';
import { UserFormComponent } from '../user-form-dialog/user-form-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private readonly searchSubject: Subject<string> = new Subject<string>();
  public readonly dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  public readonly displayedColumns: string[] = ['id', 'avatar', 'fname', 'lname', 'username', 'actions'];

  public searchTerm: string = '';
  public loading: boolean = false;

  public pageIndex: number = 0;
  public pageSize: number = 10;
  public totalItems: number = 0;
  public sortColumn: string = 'id';
  public sortOrder: 'asc' | 'desc' = 'asc';
  private unsubscribe$ = new Subject();

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  constructor(private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly msgService: MsgService
  ) { }

  public ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.pageIndex = 0;
      this.loadUsers();
    });

    this.loadUsers();
  }

  public loadUsers(): void {
    this.loading = true;

    const params: Record<string, any> = {
      page: this.pageIndex + 1,
      per_page: this.pageSize,
      sort_column: this.sortColumn,
      sort_order: this.sortOrder,
      ...(this.searchTerm && { search: this.searchTerm })
    };

    this.userService.getUsers(params).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (res: GetUsersResponse | User[]): void => {
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
    this.loadUsers();
  }

  public onSortChange(event: Sort): void {
    this.sortColumn = event.active;
    this.sortOrder = event.direction === '' ? 'asc' : event.direction;
    this.loadUsers();
  }
  public onAddUser(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      height: '400px',
      width:'700px',
      disableClose: true
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (result) {
        this.loadUsers(); // reload list if user was added
      }
    });
  }
  public onEditUser(userId: number): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      height: '400px',
      width:'700px',
      data: { id: userId }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }
 public onDeleteUser(userId: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      message: 'Are you sure you want to delete this user?'
    }
  });
   const obj = {
      id: userId
    }
  dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.userService.deleteUser(obj).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (res) => {
          this.msgService.showSuccess(res.message || 'User deleted successfully');
          this.loadUsers();
        },
        error: (err) => {
          const errorMsg: string = err?.error?.message || 'Failed to delete user';
          this.msgService.showError(errorMsg);
        }
      });
    }
  });
}

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}

