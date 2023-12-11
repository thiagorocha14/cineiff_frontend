import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngressoService } from 'src/app/services/ingresso.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
    private ingressoService = inject(IngressoService);
    ingresso: any;

    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private toastService: ToastService,
        private loadingService: LoadingService
    ) {
        this.router.params.subscribe(params => {
            if (params['uuid']) {
                this.loadingService.showLoading();
                this.ingressoService.buscarIngresso(params['uuid']).subscribe({
                    next: res => {
                        this.loadingService.hideLoading();
                        this.ingresso = res;
                    },
                    error: err => {
                        this.toastService.showErrorToast(err);
                    },
                });
            } else {
                this.toastService.showToastBottomCenter('Ingresso não encontrado');
                this.route.navigate(['/']);
            }
        });
    }

    print() {
        window.print();
    }
}
