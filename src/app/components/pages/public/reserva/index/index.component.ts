import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { solicitarReserva } from 'src/app/types/solicitacao/solicitarReserva';
import { MatDialog } from '@angular/material/dialog';
import { DialogReservaComponent } from './dialog-reserva/dialog-reserva.component';
import { DialogJustificativaComponent } from './dialog-justificativa/dialog-justificativa.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
    solicitacoes: solicitarReserva[] = [];

    constructor(
        private solicitacaoService: SolicitacaoService,
        private loadingService: LoadingService,
        private dialog: MatDialog,
        private toastService: ToastService
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

    deferirSolicitacao(solicitacao: solicitarReserva, event: any) {
        event.stopPropagation();
        solicitacao.loading = true;
        this.solicitacaoService.deferirSolicitacao(solicitacao).subscribe({
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

    indeferirSolicitacao(solicitacao: solicitarReserva, event: any) {
        event.stopPropagation();
        solicitacao.loading = true;
        const dialogRef = this.dialog.open(DialogJustificativaComponent);

        dialogRef.afterClosed().subscribe(result => {
            solicitacao.loading = false;
            if (result) {
                this.solicitacaoService.indeferirSolicitacao(solicitacao, result).subscribe({
                    next: res => {
                        solicitacao.loading = false;
                        this.buscarSolicitacoes();
                    },
                    error: err => {
                        solicitacao.loading = false;
                        console.log(err);
                    },
                });
            } else {
                this.toastService.showErrorToast('É necessário informar uma justificativa');
            }
        });
    }

    recuperarSolicitacao(solicitacao: solicitarReserva, event: any) {
        event.stopPropagation();
        solicitacao.loading = true;
        this.solicitacaoService.recuperarSolicitacao(solicitacao).subscribe({
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

    abrirDialogReserva(solicitacao: solicitarReserva) {
        const dialogRef = this.dialog.open(DialogReservaComponent, {
            width: '60vw',
            data: solicitacao,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.buscarSolicitacoes();
        });
    }

    retornaClasseStatus(status: any) {
        switch (status) {
            case 'deferido':
                return 'badge-success';
            case 'indeferido':
                return 'badge-danger';
            case 'pendente':
                return 'badge-dark';
            default:
                return 'badge-dark';
        }
    }
}
