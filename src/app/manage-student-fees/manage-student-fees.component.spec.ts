import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentFeesComponent } from './manage-student-fees.component';

describe('ManageStudentFeesComponent', () => {
  let component: ManageStudentFeesComponent;
  let fixture: ComponentFixture<ManageStudentFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStudentFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageStudentFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
