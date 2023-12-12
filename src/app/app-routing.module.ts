import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//auth components
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';

//public components
import { HomeComponent } from './components/pages/public/home/home.component';
import { CalendarComponent } from './components/pages/public/calendar/calendar.component';
// import { authGuard } from './guard/auth.guard';
import { FormComponent as ReservaFormComponent } from './components/pages/public/reserva/form/form.component';
import { IndexComponent as ReservaIndexComponent } from './components/pages/public/reserva/index/index.component';
import { ShowComponent as ReservaShowComponent } from './components/pages/public/reserva/show/show.component';

import { IndexComponent as FilmesIndexComponent } from './components/pages/public/filmes/index/index.component';
import { FormComponent as FilmesFormComponent } from './components/pages/public/filmes/form/form.component';

import { ShowComponent as IngressoShowComponent } from './components/pages/public/ingresso/show/show.component';
import { RelatorioComponent } from './components/pages/public/relatorio/relatorio.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cadastrar', component: RegisterComponent },
    { path: '', component: HomeComponent },
    { path: 'agenda', component: CalendarComponent },
    { path: 'reservar', component: ReservaFormComponent },
    { path: 'reservas', component: ReservaIndexComponent },
    { path: 'reserva/:id', component: ReservaShowComponent },
    { path: 'filmes', component: FilmesIndexComponent },
    { path: 'filmes/cadastrar', component: FilmesFormComponent },
    { path: 'filmes/editar/:id', component: FilmesFormComponent },
    { path: 'ingresso/:uuid', component: IngressoShowComponent },
    { path: 'relatorio', component: RelatorioComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
