import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-loading-screen',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
    isLoading$ = this.loadingService.isLoading$;

    constructor(private loadingService: LoadingService) {}
}
