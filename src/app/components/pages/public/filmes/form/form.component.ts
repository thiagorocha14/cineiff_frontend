import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/services/filmes.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    formFilme: FormGroup = new FormGroup({});
    loading = false;
    @ViewChild('fileName') inputFileName?: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private filmesService: FilmesService,
        private router: ActivatedRoute,
        private loadingService: LoadingService
    ) {
        this.router.params.subscribe(params => {
            if (params['id']) {
                this.loadingService.showLoading();
                this.filmesService.buscarFilme(params['id']).subscribe({
                    next: res => {
                        this.loadingService.hideLoading();
                        this.formFilme.patchValue(res);
                    },
                    error: err => {
                        this.toastService.showToastBottomCenter(
                            err.error.errpr || 'Erro ao buscar filme'
                        );
                    },
                });
            }
        });
    }

    ngOnInit(): void {
        this.formFilme = this.formBuilder.group({
            nome: ['', [Validators.required]],
            sinopse: ['', [Validators.required]],
            classificacao_indicativa: ['', [Validators.required]],
            duracao_minutos: ['', [Validators.required]],
            anexo: [''],
        });
    }

    cadastrarFilme() {
        if (this.formFilme.valid) {
            this.loading = true;
            this.filmesService.cadastrarFilme(this.formFilme.value).subscribe({
                next: res => {
                    this.toastService.showToastBottomCenter('Filme cadastrado com sucesso!');
                    this.formFilme.reset();
                    this.loading = false;
                },
                error: err => {
                    this.toastService.showToastBottomCenter(
                        err.error.errpr || 'Erro ao cadastrar filme'
                    );
                    this.loading = false;
                },
            });
        }
    }

    fileChange(event: any) {
        this.formFilme.patchValue({ anexo: event.target.files[0] });

        if (this.formFilme.get('anexo')?.value) {
            this.inputFileName!.nativeElement!.value = this.formFilme.get('anexo')?.value.name;
        }
    }
}
