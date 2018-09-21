import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTitleComponent } from './part-title.component';

describe('PartTitleComponent', () => {
  let component: PartTitleComponent;
  let fixture: ComponentFixture<PartTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
