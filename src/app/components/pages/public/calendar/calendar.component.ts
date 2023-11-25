import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { registerLocaleData } from '@angular/common';

import ptBr from '@angular/common/locales/pt';
import { ReservaService } from 'src/app/services/reserva.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
registerLocaleData(ptBr);

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    // actions: CalendarEventAction[] = [
    //     {
    //         label: '<i class="fas fa-fw fa-pencil-alt"></i>',
    //         a11yLabel: 'Edit',
    //         onClick: ({ event }: { event: CalendarEvent }): void => {},
    //     },
    //     {
    //         label: '<i class="fas fa-fw fa-trash-alt"></i>',
    //         a11yLabel: 'Delete',
    //         onClick: ({ event }: { event: CalendarEvent }): void => {
    //             this.events = this.events.filter(iEvent => iEvent !== event);
    //         },
    //     },
    // ];

    refresh = new Subject<void>();

    events: CalendarEvent[] = [];

    activeDayIsOpen = true;

    constructor(
        private reservaService: ReservaService,
        private loadingService: LoadingService,
        private router: Router
    ) {}

    ngOnInit() {
        this.buscarReservas();
    }

    buscarReservas() {
        this.loadingService.showLoading();
        this.reservaService.listarReservas().subscribe((reservas: any) => {
            this.events = this.reservaService.converterReservaParaEvento(reservas);
            this.loadingService.hideLoading();
        });
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map(iEvent => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
    }
    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    acessarEvento(event: CalendarEvent) {
        const reserva = event.meta;
        this.router.navigate(['/reserva', reserva.id]);
    }
}
