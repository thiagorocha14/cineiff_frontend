import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    formReserva: FormGroup = new FormGroup({});

    @ViewChild('fileName') inputFileName?: ElementRef;

    loading = false;

    public date: any;
    public disabled = false;
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = false;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';
    public minDate: any;
    public maxDate: any;

    constructor(
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private solicitacaoService: SolicitacaoService
    ) {}

    ngOnInit(): void {
        this.date = new Date();
        this.formReserva = this.formBuilder.group({
            nome_evento: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            justificativa: ['', [Validators.required]],
            publico_alvo: ['', [Validators.required]],
            inicio: ['', [Validators.required]],
            fim: ['', [Validators.required]],
            anexo: [''],
            nome_solicitante: ['', [Validators.required]],
            documento: [
                '',
                [Validators.required, Validators.minLength(11), Validators.maxLength(14)],
            ],
            telefone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            instituicao: ['', [Validators.required]],
        });
    }

    solicitarReserva() {
        if (this.formReserva.valid) {
            this.loading = true;
            this.solicitacaoService.solicitarReserva(this.formReserva.value).subscribe({
                next: res => {
                    this.toastService.showToastBottomCenter('Solicitação criada com sucesso!');
                    this.formReserva.reset();
                    this.loading = false;
                },
                error: err => {
                    this.toastService.showToastBottomCenter('Erro ao criar solicitação!');
                    this.loading = false;
                },
            });
        }
    }

    fileChange(event: any) {
        console.log(event.target.files[0]);
        this.formReserva.patchValue({ anexo: event.target.files[0] });

        if (this.formReserva.get('anexo')?.value) {
            this.inputFileName!.nativeElement!.value = this.formReserva.get('anexo')?.value.name;
        }
    }
}
