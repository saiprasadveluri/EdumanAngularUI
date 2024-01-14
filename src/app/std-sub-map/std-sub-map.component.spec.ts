import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdSubMapComponent } from './std-sub-map.component';

describe('StdSubMapComponent', () => {
  let component: StdSubMapComponent;
  let fixture: ComponentFixture<StdSubMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdSubMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdSubMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
