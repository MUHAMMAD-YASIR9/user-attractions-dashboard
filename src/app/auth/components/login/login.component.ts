import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsgService } from '../../../shared/services/Message/msg.service';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnDestroy {
  public readonly form: FormGroup;
  public loading: boolean = false;
  private unsubscribe$ = new Subject();
  public hidePassword:boolean=true;
  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly msgService: MsgService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const payload: LoginRequest = this.form.value;

    this.auth.login(payload).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (): void => {
        this.msgService.showSuccess('Login successful!');
        this.router.navigate(['/users']);
      },
      error: (err: any): void => {
        const errorMsg: string =
          err?.error?.message || 'Unexpected error occurred';

        this.msgService.showError(errorMsg);
        this.loading = false;
      }
    });
  }
    ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
