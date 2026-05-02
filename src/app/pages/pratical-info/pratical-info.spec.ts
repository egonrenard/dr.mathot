import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticalInfo } from './pratical-info';

describe('PraticalInfo', () => {
  let component: PraticalInfo;
  let fixture: ComponentFixture<PraticalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraticalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PraticalInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
