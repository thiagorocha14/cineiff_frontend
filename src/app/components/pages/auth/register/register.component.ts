import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss', '../login/login.component.scss'],
})
export class RegisterComponent {
    email = '';
    password = '';
    confirmPassword = '';
    documento = '';
    telefone = '';
    name = '';
    loading = false;
    authService = inject(AuthService);

    constructor(private router: Router) {}

    async register() {
        this.loading = true;
        this.authService
            .register({
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                documento: this.documento,
                telefone: this.telefone,
                name: this.name,
            })
            .subscribe({
                next: this.handleSuccess.bind(this),
                error: this.handleError.bind(this),
            });
    }

    handleSuccess(res: any) {
        this.router.navigate(['/']);
        this.loading = false;
    }

    handleError(err: any) {
        this.loading = false;
        console.error(err);
    }
}
