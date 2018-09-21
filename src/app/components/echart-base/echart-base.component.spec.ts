import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartBaseComponent } from './echart-base.component';

describe('EchartBaseComponent', () => {
  let component: EchartBaseComponent;
  let fixture: ComponentFixture<EchartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
