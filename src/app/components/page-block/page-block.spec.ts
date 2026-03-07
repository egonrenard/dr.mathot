import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBlock } from './page-block';

describe('PageBlock', () => {
  let component: PageBlock;
  let fixture: ComponentFixture<PageBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
