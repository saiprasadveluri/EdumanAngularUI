import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentInfoComponent } from './manage-student-info.component';

describe('ManageStudentInfoComponent', () => {
  let component: ManageStudentInfoComponent;
  let fixture: ComponentFixture<ManageStudentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStudentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
