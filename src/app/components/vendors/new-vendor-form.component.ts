import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorModel } from '../../models/vendor-model';
import { globalModules } from '../../global-modules';

@Component({
  selector: 'app-new-vendor-form',
  imports: [...globalModules],
  templateUrl: './new-vendor-form.component.html',
  styleUrl: './new-vendor-form.component.css',
})
export class NewVendorFormComponent {
  vendorForm: FormGroup;
  vendorModel = input<VendorModel | null>(null);
  visible = input<boolean>(false);
  onClose = output();
  onSave = output<VendorModel>();

  constructor() {
    this.vendorForm = new FormGroup({
      id: new FormControl(this.vendorModel()?.id || 0),
      name: new FormControl(this.vendorModel()?.name || '', [
        Validators.required,
      ]),
      isEnabled: new FormControl(this.vendorModel()?.isEnabled || true),
    });
    effect(() => {
      if (this.vendorModel && this.vendorModel()) {
        this.vendorForm.patchValue({
          id: this.vendorModel()!.id,
          name: this.vendorModel()!.name,
          isEnabled: this.vendorModel()!.isEnabled,
        });
      }
    });
  }

  onSubmit() {
    if (this.vendorForm.valid) {
      // Handle form submission logic here
      console.log('Form submitted:', this.vendorForm.value);
      this.onSave.emit(this.vendorForm.value as VendorModel);
    } else {
      console.log('Form is invalid');
    }
  }
}
