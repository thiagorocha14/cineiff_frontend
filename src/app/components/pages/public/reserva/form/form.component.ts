import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  formReserva: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formReserva = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      pessoas: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  solicitarReserva() {
    if (this.formReserva.valid) {
      console.log(this.formReserva.value);
    }
  }

}
