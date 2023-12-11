import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filme } from '../types/filme/filme';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FilmesService {
    readonly baseUrl = `${environment.apiUrl}/filmes`;

    constructor(private http: HttpClient) {}

    buscarFilmes() {
        return this.http.get<Filme[]>(`${this.baseUrl}`);
    }

    excluirFilme(filmeId: number) {
        return this.http.delete<Filme>(`${this.baseUrl}/${filmeId}`);
    }

    cadastrarFilme(filme: Filme) {
        const formData = new FormData();
        formData.append('nome', filme.nome);
        formData.append('sinopse', filme.sinopse);
        formData.append('classificacao_indicativa', filme.classificacao_indicativa);
        formData.append('duracao_minutos', filme.duracao_minutos);

        if (filme.anexo) {
            formData.append('anexo', filme.anexo);
        }

        return this.http.post(`${this.baseUrl}`, formData);
    }

    editarFilme(filme: Filme) {
        const formData = new FormData();
        formData.append('nome', filme.nome);
        formData.append('sinopse', filme.sinopse);
        formData.append('classificacao_indicativa', filme.classificacao_indicativa);
        formData.append('duracao_minutos', filme.duracao_minutos);

        if (filme.anexo) {
            formData.append('anexo', filme.anexo);
        }

        return this.http.put(`${this.baseUrl}/${filme.id}`, formData);
    }

    buscarFilme(filmeId: number) {
        return this.http.get<Filme>(`${this.baseUrl}/${filmeId}`);
    }
}
