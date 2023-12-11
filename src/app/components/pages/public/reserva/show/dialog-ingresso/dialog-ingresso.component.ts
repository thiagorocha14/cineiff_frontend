import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IngressoService } from 'src/app/services/ingresso.service';
import { ToastService } from 'src/app/services/toast.service';
import { Reserva } from 'src/app/types/reserva/reserva';

@Component({
    selector: 'app-dialog-ingresso',
    templateUrl: './dialog-ingresso.component.html',
    styleUrls: ['./dialog-ingresso.component.scss'],
})
export class DialogIngressoComponent implements OnInit {
    reserva: Reserva;
    formIngresso: FormGroup = new FormGroup({});
    loading = false;
    constructor(
        public formBuilder: FormBuilder,
        private route: Router,
        public dialogRef: MatDialogRef<DialogIngressoComponent>,
        private ingressoService: IngressoService,
        private toastService: ToastService,
        @Inject(MAT_DIALOG_DATA) public data: Reserva
    ) {
        this.reserva = data;
    }

    ngOnInit(): void {
        this.formIngresso = this.formBuilder.group({
            reserva_id: [this.reserva.id, [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            documento: [
                '',
                [Validators.required, Validators.minLength(11), Validators.maxLength(14)],
            ],
        });
    }

    fechar(): void {
        this.dialogRef.close();
    }

    garantirIngreso() {
        this.loading = true;
        this.ingressoService
            .garantirIngresso({
                reserva_id: this.formIngresso.value.reserva_id,
                email: this.formIngresso.value.email,
                documento: this.formIngresso.value.documento,
            })
            .subscribe({
                next: (res: any) => {
                    this.fechar();
                    this.loading = false;
                    const ingresso = res;
                    this.toastService.showToastBottomCenter(`Ingresso garantido com sucesso!`);
                    this.route.navigate(['/ingresso', ingresso.uuid]);
                },
                error: err => {
                    this.loading = false;
                    this.toastService.showErrorToast(err);
                },
            });
    }
}
