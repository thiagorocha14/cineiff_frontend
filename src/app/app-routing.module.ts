import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//auth components
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';

//public components
import { HomeComponent } from './components/pages/public/home/home.component';
import { CalendarComponent } from './components/pages/public/calendar/calendar.component';
import { authGuard } from './guard/auth.guard';
import { FormComponent as EventosFormComponent } from './components/pages/public/eventos/form/form.component';
import { FormComponent as ReservaFormComponent } from './components/pages/public/reserva/form/form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: '',  component: HomeComponent, canActivate: [authGuard] },
  { path: 'agenda',  component: CalendarComponent, canActivate: [authGuard]  },
  { path: 'eventos',  component: EventosFormComponent, canActivate: [authGuard] },
  { path: 'reserva',  component: ReservaFormComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
