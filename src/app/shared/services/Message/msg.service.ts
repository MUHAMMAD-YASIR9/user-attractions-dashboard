import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MsgService {
  constructor(private readonly snackBar: MatSnackBar) { }

  public showSuccess(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-success'],
      verticalPosition: 'bottom'
    });
  }

  public showError(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-error'],
      verticalPosition: 'bottom'
    });
  }

  public showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-info'],
      verticalPosition: 'top'
    });
  }
}
