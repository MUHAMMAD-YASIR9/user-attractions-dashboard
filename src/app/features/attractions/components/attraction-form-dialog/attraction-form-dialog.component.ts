import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';

import { AttractionsService } from '../../services/attractions.service';
import { MsgService } from '../../../../shared/services/Message/msg.service';
import {
  CreateAttractionRequest,
  UpdateAttractionRequest
} from '../../models/attraction-request.model';

@Component({
  selector: 'app-attraction-form-dialog',
  standalone: true,
  templateUrl: './attraction-form-dialog.component.html',
  styleUrl: './attraction-form-dialog.component.scss',
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
export class AttractionFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public isEditMode: boolean = false;
  public loading: boolean = false;

  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: { id?: number },
    private readonly dialogRef: MatDialogRef<AttractionFormComponent>,
    private readonly attractionService: AttractionsService,
    private readonly msgService: MsgService
  ) {
    this.isEditMode = !!data?.id;
    this.form = this.fb.group({
      name: ['', Validators.required],
      detail: ['', Validators.required],
      coverimage: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    if (this.isEditMode && this.data.id) {
      this.attractionService.getAttractionById(this.data.id).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (res) => {
          this.form.patchValue(res.attraction);
        },
        error: (err) => {
          this.msgService.showError(err?.error?.message || 'Failed to load attraction');
        }
      });
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const payload = this.form.value;

    const request$ = this.isEditMode
      ? this.attractionService.updateAttraction({ ...payload, id: this.data.id! } as UpdateAttractionRequest)
      : this.attractionService.createAttraction(payload as CreateAttractionRequest);

    request$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res) => {
        this.msgService.showSuccess(res.message || 'Operation successful');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.msgService.showError(err?.error?.message || 'Unexpected error');
        this.loading = false;
      }
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
