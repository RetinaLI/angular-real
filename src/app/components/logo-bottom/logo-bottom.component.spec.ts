import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoBottomComponent } from './logo-bottom.component';

describe('LogoBottomComponent', () => {
  let component: LogoBottomComponent;
  let fixture: ComponentFixture<LogoBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
