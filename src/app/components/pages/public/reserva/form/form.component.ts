import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    formReserva: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formReserva = this.formBuilder.group({
            nome: ['', [Validators.required]],
            justificativa: ['', [Validators.required]],
            telefone: ['', [Validators.required]],
            email: ['', [Validators.required]],
            instituicao: ['', [Validators.required]],
            publico_alvo: ['', [Validators.required]],
        });
    }

    solicitarReserva() {
        if (this.formReserva.valid) {
            console.log(this.formReserva.value);
        }
    }
}
