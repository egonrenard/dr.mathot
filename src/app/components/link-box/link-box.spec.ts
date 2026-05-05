import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBox } from './link-box';

describe('LinkBox', () => {
  let component: LinkBox;
  let fixture: ComponentFixture<LinkBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
