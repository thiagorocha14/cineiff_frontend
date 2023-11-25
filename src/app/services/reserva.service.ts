import { HttpClient, HttpParams } from '@angular/common/http';
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
                meta: reserva,
            };
        });
        return eventos;
    }

    public buscarReservasComImagem() {
        const params = new HttpParams().set('imagem', '1');
        return this.http.get<CarouselItem[]>(`${this.baseUrl}s/confirmadas`, { params });
    }

    public buscarReservasConfirmadas() {
        return this.http.get<Reserva[]>(`${this.baseUrl}s/confirmadas`);
    }

    public buscarReserva(id: number) {
        return this.http.get<Reserva>(`${this.baseUrl}/${id}`);
    }
}
