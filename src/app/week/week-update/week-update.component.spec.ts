import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekUpdateComponent } from './week-update.component';

describe('WeekUpdateComponent', () => {
  let component: WeekUpdateComponent;
  let fixture: ComponentFixture<WeekUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
