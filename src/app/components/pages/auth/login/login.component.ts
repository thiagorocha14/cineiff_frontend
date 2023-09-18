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
      const email = this.formLogin.get('email')?.value;
      const password = this.formLogin.get('password')?.value;
      this.authService.login(email, password).subscribe((res: any) => {
        this.router.navigate(['/']);
      }, (err: any) => {
        console.log(err);
      });
    }
  }

}
