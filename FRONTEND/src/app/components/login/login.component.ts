import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userEmail: string = '';
  userPassword: string = '';
  errorMessage: string = '';

  constructor(private baseService: BaseService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('authToken');
  }

  loginUser(): void {
    this.baseService.loginUser(this.userEmail, this.userPassword).subscribe(
      response => {
        if (response.token) {
          localStorage.setItem('authToken',response.token);
          this.router.navigate(['/navbar/dashboard']);
          console.log('Logged in:', response);
        }
      },
      error => {
        alert('Helytelen Email vagy Jelszó!');
        console.error('Error logging in:', error);
      }
    );
  }

  passwordChange(userEmail:string): void {
    this.baseService.passwordChange(this.userEmail).subscribe(
      response => {
        console.log('Password change:', response);
      },
      error => {
        alert('Nem található ilyen email címmel felhasználó!');
        console.error('Error changing password:', error);
      }
    );
  }


}
