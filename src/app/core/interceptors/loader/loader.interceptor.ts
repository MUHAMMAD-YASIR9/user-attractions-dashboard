import { Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { LoaderService } from '../../../shared/services/Loader/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          loaderService.hide();
        }
      },
      error: (error: HttpErrorResponse) => {
        loaderService.hide();
      }
    }),
    finalize(() => loaderService.hide())
  );
};
