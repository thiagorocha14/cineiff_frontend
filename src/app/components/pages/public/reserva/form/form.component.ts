import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import * as moment from 'moment';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    formReserva: FormGroup = new FormGroup({});

    @ViewChild('picker') picker?: any

    public date: any;
    public disabled = false;
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = false;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';
    public minDate: any;
    public maxDate: any;

    constructor(
      private formBuilder: FormBuilder,
      private solicitacaoService: SolicitacaoService
    ) {}

    ngOnInit(): void {
        this.date = new Date();
        this.formReserva = this.formBuilder.group({
            titulo: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            justificativa: ['', [Validators.required]],
            publico_alvo: ['', [Validators.required]],
            inicio: ['', [Validators.required]],
            fim: ['', [Validators.required]],
            anexo: [''],
            nomeSolicitante: ['', [Validators.required]],
            documento: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
            telefone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            instituicao: ['', [Validators.required]],
        });
    }

    solicitarReserva() {
        if (this.formReserva.valid) {
          this.solicitacaoService.solicitarReserva(this.formReserva.value).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
    }

    toggleMinDate(evt: any) {
      if (evt.checked) {
        this._setMinDate();
      } else {
        this.minDate = null;
      }
    }

    toggleMaxDate(evt: any) {
      if (evt.checked) {
        this._setMaxDate();
      } else {
        this.maxDate = null;
      }
    }

    closePicker() {
      this.picker.cancel();
    }

    private _setMinDate() {
      const now = new Date();
      this.minDate = new Date();
      this.minDate.setDate(now.getDate() - 1);
    }


    private _setMaxDate() {
      const now = new Date();
      this.maxDate = new Date();
      this.maxDate.setDate(now.getDate() + 1);
    }
}
