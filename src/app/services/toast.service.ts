import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private snackBar: MatSnackBar) {}

    showToastTopRight(message: string) {
        this.snackBar.open(message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
        });
    }

    showToastBottomCenter(message: string) {
        this.snackBar.open(message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar'],
        });
    }

    showErrorToast(message: string) {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'],
        });
    }
}
