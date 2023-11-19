import { Injectable } from '@angular/core';
import { solicitarReserva } from '../types/solicitacao/solicitarReserva';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SolicitacaoService {
    constructor(private http: HttpClient) {}
    readonly baseUrl = 'http://localhost:8000/api/solicitacao-reserva';

    public solicitarReserva(data: solicitarReserva) {
        return this.http.post(`${this.baseUrl}`, data);
    }

    public listarSolicitacoes() {
        return this.http.get(`${this.baseUrl}`);
    }

    public deferirSolicitacao(solicitacao: solicitarReserva) {
        return this.http.put(`${this.baseUrl}/${solicitacao.id}`, {});
    }

    public indeferirSolicitacao(solicitacao: solicitarReserva) {
        return this.http.delete(`${this.baseUrl}/${solicitacao.id}`);
    }

    public recuperarSolicitacao(solicitacao: solicitarReserva) {
        return this.http.put(`${this.baseUrl}/${solicitacao.id}/recuperar`, {});
    }
}
