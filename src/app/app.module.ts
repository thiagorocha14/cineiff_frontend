import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { FormsModule } from '@angular/forms';

//http service module
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/shared/layout/header/header.component';

import { AppMaterialModule } from './app-material.module';
import { HomeComponent } from './components/pages/public/home/home.component';
import { CalendarComponent } from './components/pages/public/calendar/calendar.component';
import { FormComponent as EventosFormComponent } from './components/pages/public/eventos/form/form.component';
import { FormComponent as ReservaFormComponent } from './components/pages/public/reserva/form/form.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { PromisedBtnDirective } from './directives/promised-btn/promised-btn.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    CalendarComponent,
    EventosFormComponent,
    ReservaFormComponent,
    PromisedBtnDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    //http service module
    HttpClientModule,
    AppMaterialModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
