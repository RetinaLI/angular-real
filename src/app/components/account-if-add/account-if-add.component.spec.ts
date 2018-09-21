import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIfAddComponent } from './account-if-add.component';

describe('AccountIfAddComponent', () => {
  let component: AccountIfAddComponent;
  let fixture: ComponentFixture<AccountIfAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountIfAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountIfAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
