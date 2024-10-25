import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekShowComponent } from './week-show.component';

describe('WeekShowComponent', () => {
  let component: WeekShowComponent;
  let fixture: ComponentFixture<WeekShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
