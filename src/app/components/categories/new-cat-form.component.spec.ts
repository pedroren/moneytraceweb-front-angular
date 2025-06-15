import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCatFormComponent } from './new-cat-form.component';

describe('NewCatFormComponent', () => {
  let component: NewCatFormComponent;
  let fixture: ComponentFixture<NewCatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCatFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
