import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeHeadsComponent } from './manage-fee-heads.component';

describe('ManageFeeHeadsComponent', () => {
  let component: ManageFeeHeadsComponent;
  let fixture: ComponentFixture<ManageFeeHeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFeeHeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFeeHeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
