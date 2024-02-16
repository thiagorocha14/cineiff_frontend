import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { solicitarReserva } from 'src/app/types/solicitacao/solicitarReserva';
import { DialogJustificativaComponent } from '../dialog-justificativa/dialog-justificativa.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-dialog-reserva',
    templateUrl: './dialog-reserva.component.html',
    styleUrls: ['./dialog-reserva.component.scss'],
})
export class DialogReservaComponent {
    public minDate = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(':'));

    solicitacao: solicitarReserva;
    @ViewChild('dataInicio') dataInicio!: ElementRef;
    @ViewChild('dataFim') dataFim!: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<DialogReservaComponent>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: solicitarReserva,
        private solicitacaoService: SolicitacaoService,
        private toastService: ToastService
    ) {
        this.solicitacao = data;
    }

    fechar(): void {
        this.dialogRef.close();
    }

    deferirSolicitacao() {
        this.solicitacao.loading = true;
        const solicitacao = this.solicitacao;
        this.solicitacaoService.deferirSolicitacao(solicitacao).subscribe({
            next: res => {
                this.solicitacao.loading = false;
                this.fechar();
            },
            error: err => {
                this.solicitacao.loading = false;
                this.toastService.showErrorToast(err);
            },
        });
    }

    indeferirSolicitacao() {
        this.solicitacao.loading = true;
        const solicitacao = this.solicitacao;
        const dialogRef = this.dialog.open(DialogJustificativaComponent);

        dialogRef.afterClosed().subscribe(result => {
            solicitacao.loading = false;
            if (result) {
                this.solicitacaoService.indeferirSolicitacao(solicitacao, result).subscribe({
                    next: res => {
                        solicitacao.loading = false;
                        this.fechar();
                    },
                    error: err => {
                        solicitacao.loading = false;
                        this.toastService.showErrorToast(err);
                    },
                });
            } else {
                this.toastService.showErrorToast('É necessário informar uma justificativa');
            }
        });
    }

    editarDataInicio() {
        if (this.dataInicio != null) {
            this.dataInicio.nativeElement.showPicker();
        }
    }

    editarDataFim() {
        if (this.dataFim != null) {
            this.dataFim.nativeElement.showPicker();
        }
    }
}
