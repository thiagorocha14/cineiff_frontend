import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ToastService } from 'src/app/services/toast.service';
import { Filme } from 'src/app/types/filme/filme';
import { Reserva } from 'src/app/types/reserva/reserva';
import { solicitarReserva } from 'src/app/types/solicitacao/solicitarReserva';
import { DialogIngressoComponent } from './dialog-ingresso/dialog-ingresso.component';

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
    id = 0;
    eventoJaOcorreu = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private dialog: MatDialog
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.buscarReserva(this.id);
        });
    }

    buscarReserva(id: number) {
        this.loadingService.showLoading();
        this.reservaService.buscarReserva(id).subscribe(res => {
            this.loadingService.hideLoading();
            this.reserva = res;
            this.dados_reserva = this.reserva.solicitacao_reserva;
            this.filme = this.dados_reserva.filme || false;
            this.eventoJaOcorreu = new Date(this.dados_reserva.fim) < new Date();
        });
    }

    abrirModalIngresso() {
        const dialogRef = this.dialog.open(DialogIngressoComponent, {
            width: '500px',
            data: this.reserva,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.buscarReserva(this.id);
        });
    }
}
