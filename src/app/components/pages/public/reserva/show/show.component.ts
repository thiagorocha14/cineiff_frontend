import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ToastService } from 'src/app/services/toast.service';
import { Filme } from 'src/app/types/filme/filme';
import { Reserva } from 'src/app/types/reserva/reserva';
import { solicitarReserva } from 'src/app/types/solicitacao/solicitarReserva';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
    private reservaService = inject(ReservaService);
    private loadingService = inject(LoadingService);

    reserva: Reserva | false = false;
    dados_reserva: solicitarReserva = {} as solicitarReserva;
    filme: Filme | false = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService
    ) {
        this.route.params.subscribe(params => {
            this.loadingService.showLoading();
            this.reservaService.buscarReserva(params['id']).subscribe(res => {
                this.loadingService.hideLoading();
                this.reserva = res;
                this.dados_reserva = this.reserva.solicitacao_reserva;
                this.filme = this.dados_reserva.filme || false;
            });
        });
    }
}
