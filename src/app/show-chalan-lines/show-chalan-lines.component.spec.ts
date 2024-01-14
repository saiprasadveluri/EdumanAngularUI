import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChalanLinesComponent } from './show-chalan-lines.component';

describe('ShowChalanLinesComponent', () => {
  let component: ShowChalanLinesComponent;
  let fixture: ComponentFixture<ShowChalanLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowChalanLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowChalanLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
