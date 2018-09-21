import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QeComponent } from './qe.component';

describe('QeComponent', () => {
  let component: QeComponent;
  let fixture: ComponentFixture<QeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
