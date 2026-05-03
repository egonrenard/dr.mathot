import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfBox } from './pdf-box';

describe('PdfBox', () => {
  let component: PdfBox;
  let fixture: ComponentFixture<PdfBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
