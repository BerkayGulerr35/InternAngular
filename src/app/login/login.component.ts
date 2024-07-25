import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import for HttpErrorResponse

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [LoginService]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    @Inject(LoginService) private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginService.loginUser(this.loginForm.value).subscribe(
      response => {
        console.log('Login successful', response);
        // Token ve isAdmin bilgilerini localStorage'a kaydedelim
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAdmin', response.customer.isAdmin.toString());
        // Ana sayfaya yönlendiriyoruz
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => { // Specify the type of error
        console.error('Login failed', error);
        this.errorMessage = '** Incorrect email or password **';
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

  goToRegister() {
    // Register sayfasına yönlendirme kodu
    this.router.navigate(['/register']);
  }
}
