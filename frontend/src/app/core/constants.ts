import { HttpContextToken } from '@angular/common/http';
import { ESnackbarType } from './enums';

export const WITH_AUTH = new HttpContextToken(() => false);
export const SNACKBAR_CLASS = new Map([
  [ESnackbarType.Info, 'bg-teal-tan-700'],
  [ESnackbarType.Success, 'bg-green-600'],
  [ESnackbarType.Warning, 'bg-teal-tan-400'],
  [ESnackbarType.Error, 'bg-err-red-600']
]);
