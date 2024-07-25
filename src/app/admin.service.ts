import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor() {}

  checkAdminStatus(): boolean {
    // localStorage'dan isAdmin değerini al ve boolean dön
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin === 'true';
  }
}
