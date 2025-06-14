import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVendorFormComponent } from './new-vendor-form.component';

describe('NewVendorFormComponent', () => {
  let component: NewVendorFormComponent;
  let fixture: ComponentFixture<NewVendorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVendorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVendorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
