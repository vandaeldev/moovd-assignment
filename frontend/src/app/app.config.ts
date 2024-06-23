import { importProvidersFrom, type ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SurrealModule } from 'ngx-surreal';
import { routes } from '@app/app.routes';
import interceptors from '@core/interceptors';
import { SURREAL_CONFIG } from '@core/constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors(interceptors)),
    provideAnimationsAsync(),
    importProvidersFrom(SurrealModule.forRoot(SURREAL_CONFIG))
  ]
};
