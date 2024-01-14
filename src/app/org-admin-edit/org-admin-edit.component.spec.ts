import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminEditComponent } from './org-admin-edit.component';

describe('OrgAdminEditComponent', () => {
  let component: OrgAdminEditComponent;
  let fixture: ComponentFixture<OrgAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
