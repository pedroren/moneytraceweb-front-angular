import { Component, effect, input, output } from '@angular/core';
import { globalModules } from '../../global-modules';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '../../models/category-model';

@Component({
  selector: 'app-categories-list',
  imports: [...globalModules],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
recordForm: FormGroup;
  recordModel = input<CategoryModel | null>(null);
  visible = input<boolean>(false);
  onClose = output();
  onSave = output<CategoryModel>();

  getTitle(): string {
    return this.recordModel()?.id ? 'Edit Category' : 'New Category';
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
      this.onSave.emit(this.recordForm.value as CategoryModel);
    } else {
      console.log('Form is invalid');
    }
  }
}
