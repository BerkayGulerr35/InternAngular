import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router'; // Router'ı import edelim

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  providers: [RegisterService] 
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationSuccessful: boolean = false;

  constructor(
    private fb: FormBuilder, 
    @Inject(RegisterService) private registerService: RegisterService,
    private router: Router // Router'ı inject edelim
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      tc: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value);

    this.registerService.registerUser(this.registerForm.value).subscribe(
      response => {
        console.log('Registration successful', response);
        this.registrationSuccessful = true;

        // 3 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
