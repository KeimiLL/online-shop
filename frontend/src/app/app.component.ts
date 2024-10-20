import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { NavbarComponent } from './core/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RouterLink, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
