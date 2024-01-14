import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSchoolFeeComponent } from './manage-school-fee.component';

describe('ManageSchoolFeeComponent', () => {
  let component: ManageSchoolFeeComponent;
  let fixture: ComponentFixture<ManageSchoolFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSchoolFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSchoolFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
