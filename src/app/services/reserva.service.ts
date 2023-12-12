import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../types/reserva/reserva';
import { CalendarEvent } from 'angular-calendar';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReservaService {
    constructor(private http: HttpClient) {}

    readonly baseUrl = `${environment.apiUrl}/reserva`;

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

    public buscarReservasConfirmadas() {
        return this.http.get<Reserva[]>(`${this.baseUrl}s/confirmadas`);
    }

    public buscarReserva(id: number) {
        return this.http.get<Reserva>(`${this.baseUrl}/${id}`);
    }

    public relatorio(data_inicio: string, data_fim: string) {
        let params = new HttpParams();
        params = params.append('data_inicio', data_inicio);
        params = params.append('data_fim', data_fim);
        return this.http.get(`${this.baseUrl}s/relatorio`, { params });
    }
}
