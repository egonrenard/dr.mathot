import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBlock } from './contact-block';

describe('ContactBlock', () => {
  let component: ContactBlock;
  let fixture: ComponentFixture<ContactBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
