import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { Component, Input, OnInit, inject } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ToastService } from 'src/app/services/toast.service';
import { CarouselItem } from 'src/app/types/carousel-item/carousel-item';

const left = [
    query(':enter, :leave', style({ width: '100%' }), { optional: true }),
    group([
        query(
            ':enter',
            [
                style({ transform: 'translateX(-100%)' }),
                animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
            ],
            {
                optional: true,
            }
        ),
        query(
            ':leave',
            [
                style({ transform: 'translateX(0%)' }),
                animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
            ],
            {
                optional: true,
            }
        ),
    ]),
];

const right = [
    query(':enter, :leave', style({ width: '100%' }), { optional: true }),
    group([
        query(
            ':enter',
            [
                style({ transform: 'translateX(100%)' }),
                animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
            ],
            {
                optional: true,
            }
        ),
        query(
            ':leave',
            [
                style({ transform: 'translateX(0%)' }),
                animate('.3s ease-out', style({ transform: 'translateX(-100%)' })),
            ],
            {
                optional: true,
            }
        ),
    ]),
];

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('animSlider', [transition(':increment', right), transition(':decrement', left)]),
    ],
})
export class CarouselComponent implements OnInit {
    @Input() items: CarouselItem[] = [];
    @Input() timer = 5000;
    interval: any;
    actual_item = 0;

    ngOnInit(): void {
        this.interval = setInterval(() => {
            this.next();
        }, this.timer);
    }

    next(): void {
        this.actual_item++;
        if (this.actual_item >= this.items.length) {
            this.actual_item = 0;
        }
    }

    prev(): void {
        this.actual_item--;
        if (this.actual_item < 0) {
            this.actual_item = this.items.length - 1;
        }
    }

    set(item: number): void {
        this.actual_item = item;
    }
}
