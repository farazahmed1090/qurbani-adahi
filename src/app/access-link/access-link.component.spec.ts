import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLinkComponent } from './access-link.component';

describe('AccessLinkComponent', () => {
  let component: AccessLinkComponent;
  let fixture: ComponentFixture<AccessLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
