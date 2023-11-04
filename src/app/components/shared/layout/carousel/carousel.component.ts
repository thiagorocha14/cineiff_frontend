import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

interface CarouselItem {
    title: string;
    description: string;
    image: string;
}

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
        this.items = [
            {
                title: 'Tiquinho Soares',
                description:
                    'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                image: 'https://lncimg.lance.com.br/cdn-cgi/image/width=850,height=530,fit=crop,quality=75,format=webp/uploads/2023/06/tiquinho-soares-1-aspect-ratio-512-320-2.jpg',
            },
            {
                title: 'Francisco Soares',
                description:
                    'Teste teste  teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste.',
                image: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/10/53244211569_1aa7d597c6_o-e1696801233951.jpg',
            },
            {
                title: 'De Las Chagas',
                description:
                    'Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.',
                image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/10/27/74666556-5327556134650701cba75kjpg.jpg',
            },
        ];
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
