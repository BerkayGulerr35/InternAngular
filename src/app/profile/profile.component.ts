import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [HttpClientModule,CommonModule]
})
export class ProfileComponent implements OnInit {
  userProfile!: UserProfile;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe(
      (data: UserProfile) => {
        this.userProfile = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching profile data:', error);
      }
    );
  }
}

export interface UserProfile {

Musteriler_Adi: string,
Musteriler_Email: string,
Musteriler_Soyadi: string,
Musteriler_Tc: string,
isAdmin: boolean,
__v: number,
_id: string,
Musteriler_Telefon?: string

}