import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private isLoadingSubject = new Subject<boolean>();
    isLoading$ = this.isLoadingSubject.asObservable();

    showLoading() {
        this.isLoadingSubject.next(true);
    }

    hideLoading() {
        this.isLoadingSubject.next(false);
    }
}
