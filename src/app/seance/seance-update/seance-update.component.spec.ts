import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceUpdateComponent } from './seance-update.component';

describe('SeanceUpdateComponent', () => {
  let component: SeanceUpdateComponent;
  let fixture: ComponentFixture<SeanceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeanceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeanceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
