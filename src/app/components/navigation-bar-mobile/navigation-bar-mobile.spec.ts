import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarMobile } from './navigation-bar-mobile';

describe('NavigationBarMobile', () => {
  let component: NavigationBarMobile;
  let fixture: ComponentFixture<NavigationBarMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
