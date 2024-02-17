import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/services/filmes.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Filme } from 'src/app/types/filme/filme';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
    filmes: Filme[] = [];
    todosFilmes: Filme[] = [];
    nomeFilme = '';
    constructor(
        private filmesService: FilmesService,
        private toastService: ToastService,
        private loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.buscarFilmes();
    }

    buscarFilmes() {
        this.loadingService.showLoading();
        this.filmesService.buscarFilmes().subscribe({
            next: response => {
                this.filmes = response;
                this.todosFilmes = response;
                this.loadingService.hideLoading();
            },
            error: error => {
                console.log(error);
                this.loadingService.hideLoading();
            },
        });
    }

    excluir(filme: Filme) {
        if (filme.id) {
            this.loadingService.showLoading();
            this.filmesService.excluirFilme(filme.id).subscribe({
                next: response => {
                    this.loadingService.hideLoading();
                    this.toastService.showToastBottomCenter('Filme excluído com sucesso!');
                    this.buscarFilmes();
                },
                error: error => {
                    this.loadingService.hideLoading();
                    this.toastService.showToastBottomCenter(error);
                },
            });
        }
    }

    filtrar() {
        if (this.nomeFilme == '') {
            this.filmes = this.todosFilmes;

            return;
        }

        this.filmes = this.todosFilmes.filter(filme =>
            filme.nome.toLowerCase().includes(this.nomeFilme.toLowerCase())
        );
    }
}
