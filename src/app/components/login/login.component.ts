import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit() {
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin/dashboard');
        } else if (UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('customer/dashboard');
        }
      },
      (error) => {
        this.snackBar.open('Bad Credentials', 'Error', { duration: 5000 });
      }
    );
  }
}
