import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup = new FormGroup({});
  loading = false;
  erros: any = {};

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.formLogin.valid) {
        this.erros = {};
        const email = this.formLogin.get('email')?.value;
        const password = this.formLogin.get('password')?.value;
        this.loading = true;
        this.authService.login(email, password).subscribe((res: any) => {
            this.router.navigate(['/']);
            this.loading = false;
        }, (err: any) => {
            this.erros = err.errors || {};
            this.loading = false;
        });
    }
  }

}
