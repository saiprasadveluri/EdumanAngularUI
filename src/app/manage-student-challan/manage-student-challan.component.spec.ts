import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentChallanComponent } from './manage-student-challan.component';

describe('ManageStudentChallanComponent', () => {
  let component: ManageStudentChallanComponent;
  let fixture: ComponentFixture<ManageStudentChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStudentChallanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageStudentChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
