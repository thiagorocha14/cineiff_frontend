import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJustificativaComponent } from './dialog-justificativa.component';

describe('DialogJustificativaComponent', () => {
  let component: DialogJustificativaComponent;
  let fixture: ComponentFixture<DialogJustificativaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogJustificativaComponent]
    });
    fixture = TestBed.createComponent(DialogJustificativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
