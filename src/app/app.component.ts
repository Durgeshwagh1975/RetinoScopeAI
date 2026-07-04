import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RetinoScopeAI - Advanced Retinal OCT Analysis';
  showHero = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Hero section visible only on /diseases route
        this.showHero = event.urlAfterRedirects === '/diseases';
      });
  }

  scrollToUpload(): void {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If already on diseases page, scroll down
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }
}

