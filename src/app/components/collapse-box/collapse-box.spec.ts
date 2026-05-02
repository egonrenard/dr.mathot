import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseBox } from './collapse-box';

describe('CollapseBox', () => {
  let component: CollapseBox;
  let fixture: ComponentFixture<CollapseBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapseBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
