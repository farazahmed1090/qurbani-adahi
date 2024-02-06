import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobSeekersComponent } from './all-job-seekers.component';

describe('AllJobSeekersComponent', () => {
  let component: AllJobSeekersComponent;
  let fixture: ComponentFixture<AllJobSeekersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllJobSeekersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllJobSeekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
