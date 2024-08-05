import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule] 
})
export class LayoutComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  selectedRoute: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAdminStatus().subscribe(status => {
      this.isAdmin = status;
    });
  }
}
