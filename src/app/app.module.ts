import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { FormsModule } from '@angular/forms';

//http service module
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/shared/layout/header/header.component';

import { AppMaterialModule } from './app-material.module';
import { HomeComponent } from './components/pages/public/home/home.component';
import { CalendarComponent } from './components/pages/public/calendar/calendar.component';
import { FormComponent as ReservaFormComponent } from './components/pages/public/reserva/form/form.component';
import { IndexComponent as ReservaIndexComponent } from './components/pages/public/reserva/index/index.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { PromisedBtnDirective } from './directives/promised-btn/promised-btn.directive';
import { LoadingComponent } from './components/shared/utils/loading/loading.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { IndexComponent } from './components/pages/public/filmes/index/index.component';
import { FormComponent } from './components/pages/public/filmes/form/form.component';
import { CarouselComponent } from './components/shared/layout/carousel/carousel.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        HomeComponent,
        CalendarComponent,
        ReservaFormComponent,
        ReservaIndexComponent,
        PromisedBtnDirective,
        LoadingComponent,
        IndexComponent,
        FormComponent,
        CarouselComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppMaterialModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        NgxMatMomentModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
