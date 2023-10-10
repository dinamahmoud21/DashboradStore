import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporterOperationComponent } from './exporter-operation.component';

describe('ExporterOperationComponent', () => {
  let component: ExporterOperationComponent;
  let fixture: ComponentFixture<ExporterOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExporterOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExporterOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
