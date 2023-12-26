import { Injectable } from '@angular/core';
import { solicitarReserva } from '../types/solicitacao/solicitarReserva';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SolicitacaoService {
    constructor(private http: HttpClient) {}
    readonly baseUrl = `${environment.apiUrl}/solicitacao-reserva`;

    public solicitarReserva(data: solicitarReserva) {
        const formData = new FormData();
        formData.append('nome_evento', data.nome_evento);
        formData.append('descricao', data.descricao);
        formData.append('inicio', data.inicio);
        formData.append('fim', data.fim);
        formData.append('justificativa', data.justificativa);
        formData.append('publico_alvo', data.publico_alvo);
        formData.append('nome_solicitante', data.nome_solicitante);
        formData.append('documento', data.documento);
        formData.append('telefone', data.telefone);
        formData.append('email', data.email);
        formData.append('instituicao', data.instituicao);

        if (data.filme_id) {
            formData.append('filme_id', data.filme_id.toString());
        }

        if (data.anexo) {
            formData.append('anexo', data.anexo);
        }

        return this.http.post(`${this.baseUrl}`, formData);
    }

    public listarSolicitacoes() {
        return this.http.get(`${this.baseUrl}`);
    }

    public deferirSolicitacao(solicitacao: solicitarReserva) {
        return this.http.put(`${this.baseUrl}/${solicitacao.id}`, {});
    }

    public indeferirSolicitacao(solicitacao: solicitarReserva, justificativa: string) {
        return this.http.delete(`${this.baseUrl}/${solicitacao.id}`, {
            params: { justificativa_indeferimento: justificativa },
        });
    }

    public recuperarSolicitacao(solicitacao: solicitarReserva) {
        return this.http.put(`${this.baseUrl}/${solicitacao.id}/recuperar`, {});
    }
}
