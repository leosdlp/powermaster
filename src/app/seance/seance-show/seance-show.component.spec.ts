import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceShowComponent } from './seance-show.component';

describe('SeanceShowComponent', () => {
  let component: SeanceShowComponent;
  let fixture: ComponentFixture<SeanceShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeanceShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeanceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
