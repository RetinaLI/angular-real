import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2TitleComponent } from './level2-title.component';

describe('Level2TitleComponent', () => {
  let component: Level2TitleComponent;
  let fixture: ComponentFixture<Level2TitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2TitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
