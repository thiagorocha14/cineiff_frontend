import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.scss',
    '../login/login.component.scss'
  ]
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  documento = '';
  telefone = '';
  instituicao = '';
  matricula = '';
  name = '';

  authService = inject(AuthService);

  async register() {
    this.authService.register({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      documento: this.documento,
      telefone: this.telefone,
      instituicao: this.instituicao,
      matricula: this.matricula,
    }).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleSuccess(res: any) {}

  handleError(err: any) {}
}
