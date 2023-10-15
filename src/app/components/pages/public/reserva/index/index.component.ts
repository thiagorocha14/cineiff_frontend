import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { solicitarReserva } from 'src/app/types/solicitacao/solicitarReserva';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
    solicitacoes: solicitarReserva[] = [];

    constructor(
        private solicitacaoService: SolicitacaoService,
        private loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.buscarSolicitacoes();
    }

    buscarSolicitacoes() {
        this.loadingService.showLoading();
        this.solicitacaoService.listarSolicitacoes().subscribe({
            next: res => {
                this.solicitacoes = res as solicitarReserva[];
                this.loadingService.hideLoading();
            },
            error: err => {
                console.log(err);
                this.loadingService.hideLoading();
            },
        });
    }

    aprovarSolicitacao(solicitacao: solicitarReserva) {
        solicitacao.loading = true;
        this.solicitacaoService.aprovarSolicitacao(solicitacao).subscribe({
            next: res => {
                solicitacao.loading = false;
                this.buscarSolicitacoes();
            },
            error: err => {
                solicitacao.loading = false;
                console.log(err);
            },
        });
    }

    reprovarSolicitacao(solicitacao: solicitarReserva) {
        this.solicitacaoService.reprovarSolicitacao(solicitacao).subscribe({
            next: res => {
                this.buscarSolicitacoes();
            },
            error: err => {
                console.log(err);
            },
        });
    }

    retornaClasseStatus(status: any) {
        switch (status) {
            case 'aprovado':
                return 'badge-success';
            case 'reprovado':
                return 'badge-danger';
            case 'pendente':
                return 'badge-dark';
            default:
                return 'badge-dark';
        }
    }
}
