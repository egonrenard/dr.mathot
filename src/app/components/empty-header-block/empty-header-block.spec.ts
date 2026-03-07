import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyHeaderBlock } from './empty-header-block';

describe('EmptyHeaderBlock', () => {
  let component: EmptyHeaderBlock;
  let fixture: ComponentFixture<EmptyHeaderBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyHeaderBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyHeaderBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
