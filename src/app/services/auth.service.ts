import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterData } from '../types/auth/registerData';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    readonly baseUrl = `${environment.apiUrl}/auth`;

    isLoggedIn() {
        return localStorage.getItem('token') ? true : false;
    }

    login(email: string, password: string) {
        return this.http.post(`${environment.apiUrl}/login`, {
            email,
            password,
        });
    }

    register(data: RegisterData) {
        return this.http.post(`${environment.apiUrl}/register`, data);
    }

    logout() {
        return this.http.post(`${environment.apiUrl}/logout`, {});
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    getToken() {
        const token = localStorage.getItem('token');
        return token;
    }

    isAdmin() {
        const user = this.getUser();
        return user.tipo === 'administrador';
    }
}
