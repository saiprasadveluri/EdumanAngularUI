import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassFeesComponent } from './manage-class-fees.component';

describe('ManageClassFeesComponent', () => {
  let component: ManageClassFeesComponent;
  let fixture: ComponentFixture<ManageClassFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageClassFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageClassFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
