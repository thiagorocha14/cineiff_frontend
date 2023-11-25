import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../types/reserva/reserva';
import { CalendarEvent } from 'angular-calendar';
import { CarouselItem } from '../types/carousel-item/carousel-item';

@Injectable({
    providedIn: 'root',
})
export class ReservaService {
    constructor(private http: HttpClient) {}

    readonly baseUrl = 'http://localhost:8000/api/reserva';

    public listarReservas() {
        return this.http.get(`${this.baseUrl}`);
    }

    public converterReservaParaEvento(reservas: Reserva[]): CalendarEvent[] {
        /*{
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'Palestras sobre o autismo',
            color: { ...colors['red'] },
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },*/
        const eventos = reservas.map(reserva => {
            return {
                start: new Date(reserva.inicio),
                end: new Date(reserva.fim),
                title: reserva.solicitacao_reserva.nome_evento,
                color: { primary: '#ad2121', secondary: '#FAE3E3' },
                allDay: false,
                resizable: {
                    beforeStart: false,
                    afterEnd: false,
                },
                draggable: false,
            };
        });
        return eventos;
    }

    public buscarReservasConfirmadas() {
        return this.http.get<CarouselItem[]>(`${this.baseUrl}s/confirmadas`);
    }
}
