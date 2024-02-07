import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LoadingService } from 'src/app/services/loading.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ToastService } from 'src/app/services/toast.service';
import { Reserva } from 'src/app/types/reserva/reserva';

@Component({
    selector: 'app-relatorio',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    public barChartOptions: ChartConfiguration['options'] = {
        scales: {
            x: {
                ticks: {
                    color: '#ffffff',
                },
            },
            y: {
                min: 0,
                ticks: {
                    color: '#ffffff',
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#ffffff',
                },
            },
        },
    };

    public barChartType: ChartType = 'bar';

    public barChartData: ChartData<'bar'> = {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0],
                label: 'Quantidade Reservas',
                backgroundColor: '#F99B0C',
                hoverBackgroundColor: '#F99B0C',
            },
            {
                data: [0, 0, 0, 0, 0, 0, 0],
                label: 'Média de Público',
                backgroundColor: '#374151',
                hoverBackgroundColor: '#374151',
            },
        ],
    };

    inicio: string =
        new Date().getFullYear() +
        '-' +
        String(new Date().getMonth() + 1).padStart(2, '0') +
        '-' +
        '01' +
        ' ' +
        String(new Date().getHours()).padStart(2, '0') +
        ':' +
        String(new Date().getMinutes()).padStart(2, '0');

    fim: string =
        new Date().getFullYear() +
        '-' +
        String(new Date().getMonth() + 1).padStart(2, '0') +
        '-' +
        String(new Date().getDate()).padStart(2, '0') +
        ' ' +
        String(new Date().getHours()).padStart(2, '0') +
        ':' +
        String(new Date().getMinutes()).padStart(2, '0');

    reservas: Reserva[] = [];
    total_ingressos = 0;
    qtdeTentativasMalSucedidas = 0;

    constructor(
        private reservaService: ReservaService,
        private toastService: ToastService,
        private loadingService: LoadingService
    ) {
        this.gerarRelatorio();
    }

    gerarRelatorio() {
        this.loadingService.showLoading();
        this.reservaService.relatorio(this.inicio, this.fim).subscribe({
            next: reservas => {
                this.loadingService.hideLoading();
                if (reservas.hasOwnProperty('reservas')) {
                    this.reservas = (reservas as { reservas: Reserva[] }).reservas;
                }
                if (reservas.hasOwnProperty('qtdeTentativasMalSucedidas')) {
                    this.qtdeTentativasMalSucedidas = (
                        reservas as { qtdeTentativasMalSucedidas: number }
                    ).qtdeTentativasMalSucedidas;
                }
                this.total_ingressos = this.reservas
                    .map(reserva => reserva.ingressos_reservados || 0)
                    .reduce((a, b) => a + b, 0);
                this.preencherDadosGrafico();
            },
            error: error => {
                this.loadingService.hideLoading();
                this.toastService.showToastBottomCenter(error);
            },
        });
    }

    retornaClasseStatus(status: string) {
        switch (status) {
            case 'concluido':
                return 'badge-success';
            case 'agendado':
                return 'badge-dark';
            default:
                return 'badge-dark';
        }
    }

    preencherDadosGrafico() {
        this.barChartData = {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            datasets: [
                {
                    data: [
                        this.quantidadeReservasPorDia(1),
                        this.quantidadeReservasPorDia(2),
                        this.quantidadeReservasPorDia(3),
                        this.quantidadeReservasPorDia(4),
                        this.quantidadeReservasPorDia(5),
                        this.quantidadeReservasPorDia(6),
                    ],
                    label: 'Quantidade Reservas',
                    backgroundColor: '#F99B0C',
                    hoverBackgroundColor: '#F99B0C',
                },
                {
                    data: [
                        this.mediaPublicoPorDia(1),
                        this.mediaPublicoPorDia(2),
                        this.mediaPublicoPorDia(3),
                        this.mediaPublicoPorDia(4),
                        this.mediaPublicoPorDia(5),
                        this.mediaPublicoPorDia(6),
                    ],
                    label: 'Média de Público',
                    backgroundColor: '#374151',
                    hoverBackgroundColor: '#374151',
                },
            ],
        };
    }

    quantidadeReservasPorDia(dia: number) {
        return this.reservas.filter(reserva => new Date(reserva.inicio).getDay() === dia).length;
    }

    mediaPublicoPorDia(dia: number) {
        return (
            this.reservas
                .filter(reserva => new Date(reserva.inicio).getDay() === dia)
                .map(reserva => reserva.ingressos_reservados || 0)
                .reduce((a, b) => a + b, 0) / this.quantidadeReservasPorDia(dia)
        );
    }
}
