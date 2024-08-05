// admin.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminStatusSubject: BehaviorSubject<boolean>;

  constructor() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.adminStatusSubject = new BehaviorSubject<boolean>(isAdmin);
  }

  getAdminStatus(): Observable<boolean> {
    return this.adminStatusSubject.asObservable();
  }

  updateAdminStatus(status: boolean): void {
    localStorage.setItem('isAdmin', String(status));
    this.adminStatusSubject.next(status);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.updateAdminStatus(false);
  }
}
