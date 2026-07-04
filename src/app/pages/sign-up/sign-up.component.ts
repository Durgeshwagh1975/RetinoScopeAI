import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user = {
    name: '',
    email: '',
    password: '',
    gender: '',
    country: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    localStorage.setItem('userData', JSON.stringify(this.user));
    alert('Account created successfully! Please sign in.');
    this.router.navigate(['/sign-in']);
  }
}
