import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const storeUser = JSON.parse(savedUser);
      if (storeUser.email === this.user.email && storeUser.password === this.user.password) {
        alert('Login Successful! Welcome back.');
        this.router.navigate(['/diseases']);
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('No registered user found. Please sign up first.');
    }
  }
}
