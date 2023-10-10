import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresOperationsComponent } from './stores-operations.component';

describe('StoresOperationsComponent', () => {
  let component: StoresOperationsComponent;
  let fixture: ComponentFixture<StoresOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
