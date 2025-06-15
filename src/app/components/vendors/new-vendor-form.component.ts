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
  recordForm: FormGroup;
  recordModel = input<VendorModel | null>(null);
  visible = input<boolean>(false);
  onClose = output();
  onSave = output<VendorModel>();

  getTitle(): string {
    return this.recordModel()?.id ? 'Edit Vendor' : 'New Vendor';
  };

  constructor() {
    this.recordForm = new FormGroup({
      id: new FormControl(this.recordModel()?.id || 0),
      name: new FormControl(this.recordModel()?.name || '', [
        Validators.required,
      ]),
      isEnabled: new FormControl(this.recordModel()?.isEnabled || true),
    });
    effect(() => {
      if (this.recordModel && this.recordModel()) {
        this.recordForm.patchValue({
          id: this.recordModel()!.id,
          name: this.recordModel()!.name,
          isEnabled: this.recordModel()!.isEnabled,
        });
      }
    });
  }

  onSubmit() {
    if (this.recordForm.valid) {
      // Handle form submission logic here
      console.log('Form submitted:', this.recordForm.value);
      this.onSave.emit(this.recordForm.value as VendorModel);
    } else {
      console.log('Form is invalid');
    }
  }
}
