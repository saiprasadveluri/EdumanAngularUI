import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeReceiptsComponent } from './fee-receipts.component';

describe('FeeReceiptsComponent', () => {
  let component: FeeReceiptsComponent;
  let fixture: ComponentFixture<FeeReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeReceiptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
