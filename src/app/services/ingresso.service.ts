import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface requestIngresso {
    email: string;
    documento: string;
    reserva_id: number;
}

@Injectable({
    providedIn: 'root',
})
export class IngressoService {
    readonly baseUrl = `${environment.apiUrl}/ingresso`;

    constructor(private http: HttpClient) {}

    public garantirIngresso(ingresso: requestIngresso) {
        return this.http.post(`${this.baseUrl}`, ingresso);
    }

    public buscarIngresso(uuid: string) {
        return this.http.get(`${this.baseUrl}/${uuid}`);
    }
}
