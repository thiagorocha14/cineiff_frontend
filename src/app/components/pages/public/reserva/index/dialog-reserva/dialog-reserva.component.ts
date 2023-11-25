import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { solicitarReserva } from 'src/app/types/solicitacao/solicitarReserva';

@Component({
    selector: 'app-dialog-reserva',
    templateUrl: './dialog-reserva.component.html',
    styleUrls: ['./dialog-reserva.component.scss'],
})
export class DialogReservaComponent {
    solicitacao: solicitarReserva;

    constructor(
        public dialogRef: MatDialogRef<DialogReservaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: solicitarReserva,
        private solicitacaoService: SolicitacaoService
    ) {
        this.solicitacao = data;
    }

    fechar(): void {
        this.dialogRef.close();
    }

    aprovarSolicitacao() {
        this.solicitacao.loading = true;
        const solicitacao = this.solicitacao;
        this.solicitacaoService.aprovarSolicitacao(solicitacao).subscribe({
            next: res => {
                this.solicitacao.loading = false;
                this.fechar();
            },
            error: err => {
                this.solicitacao.loading = false;
                console.log(err);
            },
        });
    }

    reprovarSolicitacao() {
        this.solicitacao.loading = true;
        const solicitacao = this.solicitacao;
        this.solicitacaoService.reprovarSolicitacao(solicitacao).subscribe({
            next: res => {
                this.solicitacao.loading = false;
                this.fechar();
            },
            error: err => {
                this.solicitacao.loading = false;
                console.log(err);
            },
        });
    }
}
