import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvcompComponent } from './nvcomp.component';

describe('NvcompComponent', () => {
  let component: NvcompComponent;
  let fixture: ComponentFixture<NvcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NvcompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NvcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
