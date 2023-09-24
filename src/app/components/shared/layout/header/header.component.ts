import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(
        public router: Router,
        private authService: AuthService,
        private loadingService: LoadingService
    ) {}

    isLogged() {
        return this.authService.isLoggedIn();
    }

    logout() {
        this.loadingService.showLoading();
        this.authService.logout().subscribe({
            next: this.handleSuccess.bind(this),
            error: this.handleError.bind(this),
        });
    }

    isAdmin() {
        return this.authService.isAdmin();
    }

    handleSuccess(res: any) {
        this.router.navigate(['/']);
        localStorage.removeItem('token');
        this.loadingService.hideLoading();
    }

    handleError(err: any) {
        console.error(err);
        localStorage.removeItem('token');
        this.loadingService.hideLoading();
    }
}
