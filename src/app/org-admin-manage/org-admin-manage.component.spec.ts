import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminManageComponent } from './org-admin-manage.component';

describe('OrgAdminManageComponent', () => {
  let component: OrgAdminManageComponent;
  let fixture: ComponentFixture<OrgAdminManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
