import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-justificativa',
  templateUrl: './dialog-justificativa.component.html',
  styleUrls: ['./dialog-justificativa.component.scss']
})
export class DialogJustificativaComponent {
    justificativa = '';

    constructor(
        public dialogRef: MatDialogRef<DialogJustificativaComponent>,
    ) {}

    fechar(): void {
        this.dialogRef.close();
    }

    enviarJustificativa() {
        this.dialogRef.close(this.justificativa);
    }
}
