import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../admin.service'; // AdminService'in doğru yolda olduğundan emin olun

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  isAdmin = false;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.updateAdminStatus();
  }

  private updateAdminStatus() {
    this.isAdmin = this.adminService.checkAdminStatus();
  }
}
