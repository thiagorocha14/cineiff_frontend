import { Injectable } from '@angular/core';
import { solicitarReserva } from '../types/solicitacao/solicitarReserva';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:8000/api/solicitacao';

  public solicitarReserva(data: solicitarReserva)
  {
    return this.http.post(`${this.baseUrl}/solicitar-reserva`, data);
  }
}
