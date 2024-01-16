import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';
import { Filme } from 'src/app/types/filme/filme';
import { FilmesService } from 'src/app/services/filmes.service';
import { Subject, takeUntil } from 'rxjs';

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
    public filmeControl: FormControl<null | Filme> = new FormControl<null | Filme>(null);
    public filtroFilmeControl: FormControl<null | string> = new FormControl<string>('');
    public filmes: Filme[] = [];
    public filmesFiltrados: Filme[] = [];
    protected _onDestroy = new Subject<void>();

    protected revalidarData = false;
    protected periodoAnterior: Date[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private solicitacaoService: SolicitacaoService,
        private filmeService: FilmesService
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
            filme_id: [''],
        });

        this.buscarFilmes();

        this.filtroFilmeControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filtrarFilmes();
        });

        this.filmeControl.valueChanges.subscribe(() => {
            console.log('filmeControl => ', this.filmeControl.value);
            this.formReserva.patchValue({ filme_id: this.filmeControl.value?.id });
        });
    }

    solicitarReserva() {
        if (this.formReserva.valid) {
            if (
                this.revalidarData &&
                this.periodoAnterior[0] === this.formReserva.value.inicio &&
                this.periodoAnterior[1] === this.formReserva.value.fim
            ) {
                this.toastService.showErrorToast('Já existe uma solicitação de reserva para esse período.');
                this.loading = false;
                return;
            }
            this.loading = true;
            this.solicitacaoService.solicitarReserva(this.formReserva.value).subscribe({
                next: res => {
                    this.toastService.showToastBottomCenter('Solicitação criada com sucesso!');
                    this.formReserva.reset();
                    this.loading = false;
                },
                error: err => {
                    if (err === 'Já existe uma solicitação de reserva para esse período.') {
                        this.revalidarData = true;
                        this.periodoAnterior = [this.formReserva.value.inicio, this.formReserva.value.fim];
                        this.toastService.showErrorToast(err);
                        this.loading = false;
                    }
                },

            });
        }
    }

    fileChange(event: any) {
        const formData: FormData = new FormData();
        const fileUpload = event.target.files[0];
        console.log('fileUpload => ', fileUpload);
        if (!fileUpload) {
            return;
        }

        const fileName = fileUpload.name;
        formData.append('file', fileUpload);
        this.formReserva.patchValue({ anexo: fileUpload });
        console.log('formData => ', formData);
        this.formReserva.updateValueAndValidity();
        this.inputFileName!.nativeElement!.value = fileName;
    }

    buscarFilmes() {
        this.filmeService.buscarFilmes().subscribe({
            next: res => {
                this.filmes = res;
                this.filmesFiltrados = res;
            },
            error: err => {
                this.toastService.showToastBottomCenter('Erro ao buscar filmes!');
            },
        });
    }

    filtrarFilmes() {
        const pesquisa = this.filtroFilmeControl.value;

        if (pesquisa) {
            this.filmesFiltrados = this.filmes.filter(filme => {
                return filme.nome.toLowerCase().includes(pesquisa.toLowerCase());
            });

            return;
        }

        this.filmesFiltrados = this.filmes;
    }
}
