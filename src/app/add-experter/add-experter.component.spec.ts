import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperterComponent } from './add-experter.component';

describe('AddExperterComponent', () => {
  let component: AddExperterComponent;
  let fixture: ComponentFixture<AddExperterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExperterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExperterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
