import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedJobSecComponent } from './featured-job-sec.component';

describe('FeaturedJobSecComponent', () => {
  let component: FeaturedJobSecComponent;
  let fixture: ComponentFixture<FeaturedJobSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedJobSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedJobSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
