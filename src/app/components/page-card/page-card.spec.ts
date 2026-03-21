import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCard } from './page-card';

describe('PageCard', () => {
  let component: PageCard;
  let fixture: ComponentFixture<PageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
