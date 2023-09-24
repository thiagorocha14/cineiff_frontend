import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterData } from '../types/auth/registerData';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    isLoggedIn() {
        return localStorage.getItem('token') ? true : false;
    }

    login(email: string, password: string) {
        return this.http.post('http://localhost:8000/api/login', {
            email,
            password,
        });
    }

    register(data: RegisterData) {
        return this.http.post('http://localhost:8000/api/register', data);
    }

    logout() {
        return this.http.post('http://localhost:8000/api/logout', {});
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
