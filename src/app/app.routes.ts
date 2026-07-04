import { Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { DiseasesComponent } from './pages/diseases/diseases.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
     {path: '', redirectTo: '/diseases', pathMatch: 'full'},
     {path: 'about-us', component: AboutUsComponent },
     {path: 'diseases', component: DiseasesComponent },
     {path: 'contact', component: ContactComponent },
     {path: 'sign-in', component: SignInComponent },
     {path: 'sign-up', component: SignUpComponent }
     
];
