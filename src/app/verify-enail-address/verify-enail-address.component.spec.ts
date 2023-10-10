import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEnailAddressComponent } from './verify-enail-address.component';

describe('VerifyEnailAddressComponent', () => {
  let component: VerifyEnailAddressComponent;
  let fixture: ComponentFixture<VerifyEnailAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEnailAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEnailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
