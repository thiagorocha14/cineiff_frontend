import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
    ) {
        this.router.events.subscribe((val: any) => {
            if (val instanceof NavigationEnd) {
                this.hideMenu();
            }
        });
    }

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

    toggleMenu() {
        const menu = document.getElementById('navbar-solid-bg');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    hideMenu() {
        const menu = document.getElementById('navbar-solid-bg');

        if (!menu) {
            return;
        }

        if (menu.classList.contains('hidden') === false) {
            menu.classList.add('hidden');
        }
    }
}
