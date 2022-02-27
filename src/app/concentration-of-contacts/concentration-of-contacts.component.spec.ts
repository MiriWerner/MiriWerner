import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentrationOfContactsComponent } from './concentration-of-contacts.component';

describe('ConcentrationOfContactsComponent', () => {
  let component: ConcentrationOfContactsComponent;
  let fixture: ComponentFixture<ConcentrationOfContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcentrationOfContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentrationOfContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
