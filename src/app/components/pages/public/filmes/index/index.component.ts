import { Component, OnInit } from '@angular/core';
import { th } from 'date-fns/locale';
import { FilmesService } from 'src/app/services/filmes.service';
import { ToastService } from 'src/app/services/toast.service';
import { Filme } from 'src/app/types/filme/filme';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    filmes: Filme[] = [];
    todosFilmes: Filme[] = [];
    nomeFilme = '';
    constructor(
      private filmesService: FilmesService,
      private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.buscarFilmes();
    }

    buscarFilmes() {
        this.filmesService.buscarFilmes().subscribe({
          next: (response) => {
              this.filmes = response;
              this.todosFilmes = response;
          },
          error: (error) => {
              console.log(error);
          },
        });
    }

    excluir(filme: Filme) {
      if (filme.id) {
          this.filmesService.excluirFilme(filme.id).subscribe({
              next: (response) => {
                  this.toastService.showToastBottomCenter('Filme excluído com sucesso!');
                  this.buscarFilmes();
              },
              error: (error) => {
                  this.toastService.showToastBottomCenter(error.error.error || 'Erro ao excluir filme');
                  console.log(error);
              },
          });
      }
    }

    filtrar() {
        if (this.nomeFilme == '') {
            this.filmes = this.todosFilmes;

            return;
        }

        this.filmes = this.todosFilmes.filter((filme) => filme.nome.toLowerCase().includes(this.nomeFilme.toLowerCase()));
    }
}
