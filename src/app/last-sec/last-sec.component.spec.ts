import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSecComponent } from './last-sec.component';

describe('LastSecComponent', () => {
  let component: LastSecComponent;
  let fixture: ComponentFixture<LastSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
