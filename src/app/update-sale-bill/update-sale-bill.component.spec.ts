import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaleBillComponent } from './update-sale-bill.component';

describe('UpdateSaleBillComponent', () => {
  let component: UpdateSaleBillComponent;
  let fixture: ComponentFixture<UpdateSaleBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSaleBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSaleBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
