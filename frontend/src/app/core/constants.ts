import { HttpContextToken } from '@angular/common/http';

export const API_URL = `${window.location.origin}/api`;
export const WITH_AUTH = new HttpContextToken(() => false);
