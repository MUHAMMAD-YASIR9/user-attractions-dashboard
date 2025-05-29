import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';
import { loaderInterceptor } from './core/interceptors/loader/loader.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor])
    )
  ]
};
