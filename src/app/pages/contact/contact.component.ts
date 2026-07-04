import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  user = { name: '', email: '', subject: '', message: '' };
  messageSent = false;

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Form submitted', this.user);
    this.messageSent = true;
    
    // Reset form after showing success
    setTimeout(() => {
      this.user = { name: '', email: '', subject: '', message: '' };
      this.messageSent = false;
    }, 3000);
  }
}
