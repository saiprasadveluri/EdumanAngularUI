import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcdYearManageComponent } from './acd-year-manage.component';

describe('AcdYearManageComponent', () => {
  let component: AcdYearManageComponent;
  let fixture: ComponentFixture<AcdYearManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcdYearManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcdYearManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
