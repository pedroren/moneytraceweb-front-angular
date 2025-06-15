import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountFormComponent } from './new-account-form.component';

describe('NewAccountFormComponent', () => {
  let component: NewAccountFormComponent;
  let fixture: ComponentFixture<NewAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAccountFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
