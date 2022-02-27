import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationInProcessComponent } from './information-in-process.component';

describe('InformationInProcessComponent', () => {
  let component: InformationInProcessComponent;
  let fixture: ComponentFixture<InformationInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationInProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
