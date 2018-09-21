import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgTextSheetsComponent } from './img-text-sheets.component';

describe('ImgTextSheetsComponent', () => {
  let component: ImgTextSheetsComponent;
  let fixture: ComponentFixture<ImgTextSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgTextSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgTextSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
