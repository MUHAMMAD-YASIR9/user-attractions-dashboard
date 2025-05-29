import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { MsgService } from '../../../../shared/services/Message/msg.service';
import { UpdateUserRequest, CreateUserRequest } from '../../models/user-request.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
 imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public loading: boolean = false;
  private unsubscribe$ = new Subject();
  public isEditMode: boolean = false;
  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: { id?: number },
    private readonly dialogRef: MatDialogRef<UserFormComponent>,
    private readonly userService: UserService,
    private readonly msgService: MsgService
  ) {
    this.isEditMode = !!this.data?.id;
    this.form = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      avatar: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if (this.isEditMode && this.data.id) {
      this.userService.getUserById(this.data.id).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (res) => {
          this.form.patchValue(res.user);
        },
        error: (err: any): void => {
          const errorMsg: string =
            err?.error?.message || 'Unexpected error occurred';
          this.msgService.showError(errorMsg);
        }
      });
    }
  }
  public onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const formValue = this.form.value;

    const action$ = this.isEditMode
      ? this.userService.updateUser({ ...formValue, id: this.data.id! } as UpdateUserRequest)
      : this.userService.createUser({
        fname: formValue.fname,
        lname: formValue.lname,
        username: formValue.username,
        password: formValue.password,
        email: formValue.email,
        avatar: formValue.avatar
      } as CreateUserRequest);

    action$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (res: any) => {
        this.msgService.showSuccess(res.message);
        this.dialogRef.close(true);
      },
      error: (err: any): void => {
        const errorMsg: string =
          err?.error?.message || 'Unexpected error occurred';
        this.msgService.showError(errorMsg);
        this.loading = false;
      }
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
