import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, LayoutComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin = false;
  private adminSubscription: Subscription | null = null;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.adminSubscription = this.adminService.getAdminStatus().subscribe(status => {
      this.isAdmin = status;
    });
  }

  ngOnDestroy() {
    if (this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
  }
}
