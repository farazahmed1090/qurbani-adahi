import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAmployersComponent } from './all-amployers.component';

describe('AllAmployersComponent', () => {
  let component: AllAmployersComponent;
  let fixture: ComponentFixture<AllAmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAmployersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
