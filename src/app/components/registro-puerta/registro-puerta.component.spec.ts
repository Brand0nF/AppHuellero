import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPuertaComponent } from './registro-puerta.component';

describe('RegistroPuertaComponent', () => {
  let component: RegistroPuertaComponent;
  let fixture: ComponentFixture<RegistroPuertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPuertaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPuertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
