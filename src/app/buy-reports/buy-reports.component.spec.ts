import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyReportsComponent } from './buy-reports.component';

describe('BuyReportsComponent', () => {
  let component: BuyReportsComponent;
  let fixture: ComponentFixture<BuyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
