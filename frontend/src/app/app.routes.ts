import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';

export const routes: Routes = [
    {
      path: 'login',
    component: LoginComponent  
    },
    {
      path: 'register',
    component: RegisterComponent  
    },    
];
