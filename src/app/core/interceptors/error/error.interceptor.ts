import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MsgService } from '../../../shared/services/Message/msg.service';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  const msgService = inject(MsgService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        sessionStorage.clear(); // or remove only token if needed
        msgService.showError('Session expired. Please log in again.');
        router.navigate(['/login']);
      }
      // Let other errors bubble up to component if needed
      return throwError(() => error);
    })
  );
};
