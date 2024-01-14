import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChalansComponent } from './show-chalans.component';

describe('ShowChalansComponent', () => {
  let component: ShowChalansComponent;
  let fixture: ComponentFixture<ShowChalansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowChalansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowChalansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
