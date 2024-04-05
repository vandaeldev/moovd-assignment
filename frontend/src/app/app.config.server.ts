import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    provideClientHydration(withHttpTransferCacheOptions({includePostRequests: true}))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
