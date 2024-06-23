import { ESnackbarType } from '@core/enums';
import { environment } from '@src/environments/environment.development';
import type { SurrealConfig } from 'ngx-surreal';

export const SNACKBAR_CLASS = new Map([
  [ESnackbarType.Info, 'bg-teal-tan-700'],
  [ESnackbarType.Success, 'bg-green-600'],
  [ESnackbarType.Warning, 'bg-teal-tan-400'],
  [ESnackbarType.Error, 'bg-err-red-600']
]);
export const SURREAL_SCOPE = 'user';
export const SURREAL_CONFIG = { url: environment.databaseUrl, ...environment.databaseOpts } satisfies SurrealConfig;
