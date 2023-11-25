import { Component, inject } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { CarouselItem } from 'src/app/types/carousel-item/carousel-item';
import { Reserva } from 'src/app/types/reserva/reserva';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    private reservaService = inject(ReservaService);
    private loadingService = inject(LoadingService);

    reservasConfirmadas: Reserva[] = [];
    reservasConfirmadasComImagem: Reserva[] = [];
    items: CarouselItem[] = [];

    constructor() {
        this.loadingService.showLoading();
        this.reservaService.buscarReservasConfirmadas().subscribe(reservas => {
            this.loadingService.hideLoading();
            this.reservasConfirmadas = reservas;
            this.reservasConfirmadasComImagem = this.reservasConfirmadas.filter(
                reserva => reserva.image
            );
            this.populaItensCarousel();
        });
    }

    populaItensCarousel() {
        this.reservasConfirmadasComImagem.forEach(reserva => {
            this.items.push({
                title: reserva.solicitacao_reserva.nome_evento,
                image: reserva.image,
                description: reserva.solicitacao_reserva.descricao,
                link: `/reserva/${reserva.id}`,
            });
        });
    }
}
