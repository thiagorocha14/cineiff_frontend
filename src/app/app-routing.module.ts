import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//auth components
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';

//public components
import { HomeComponent } from './components/pages/public/home/home.component';
import { CalendarComponent } from './components/pages/public/calendar/calendar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: '',  component: HomeComponent },
  { path: 'agenda',  component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
