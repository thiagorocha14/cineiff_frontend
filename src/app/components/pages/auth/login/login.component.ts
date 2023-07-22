import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService
  ) { }

  login() {
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    });
  }

}
