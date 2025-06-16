import { Component, effect, input, output } from '@angular/core';
import { CategoryModel, CategoryType, SubCategoryModel } from '../../models/category-model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { globalModules } from '../../global-modules';
import { BooleanCellPipe } from "../../pipes/boolean-cell.pipe";

@Component({
  selector: 'app-new-cat-form',
  imports: [...globalModules, BooleanCellPipe],
  templateUrl: './new-cat-form.component.html',
  styleUrl: './new-cat-form.component.css'
})
export class NewCatFormComponent {
  recordForm: FormGroup;
  recordModel = input<CategoryModel | null>(null);
  visible = input<boolean>(false);
  onClose = output();
  onSave = output<CategoryModel>();

  showModal: boolean = false;
  catTypes: string[] = Object.values(CategoryType);

  getTitle(): string {
    return this.recordModel()?.id ? 'Edit Category' : 'New Category';
  };
  
  constructor(private fb: FormBuilder) {
    this.recordForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [
        Validators.required,
      ]),
      type: new FormControl(CategoryType.Expense, [
        Validators.required,
      ]),
      subCategories: this.fb.array([]),
      isEnabled: new FormControl(true),
    });
    effect(() => {
      if (this.recordModel && this.recordModel()) {
        console.log('recordModel:', this.recordModel());
        this.recordForm.patchValue({
          id: this.recordModel()!.id,
          name: this.recordModel()!.name,
          type: this.recordModel()!.type,
          // subCategories: this.fb.array([]), // Reset subCategories array
          isEnabled: this.recordModel()!.isEnabled,
        });
        // Clear existing subcategories
        while (this.subCategoriesArray.length !== 0) {
          this.subCategoriesArray.removeAt(0);
        }

        // Add subcategories
        this.recordModel()!.subCategories.forEach(subCategory => {
          const subCategoryFormGroup = this.createSubCategoryFormGroup(subCategory);
          this.subCategoriesArray.push(subCategoryFormGroup);
        });
      }
      this.showModal = this.visible();
    });
  }

  get subCategoriesArray(): FormArray {
    return this.recordForm.get('subCategories') as FormArray;
  }
  createSubCategoryFormGroup(subCategory?: SubCategoryModel): FormGroup {
    return this.fb.group({
      id: [subCategory?.id || 0],
      name: [subCategory?.name || '', [Validators.required, Validators.minLength(2)]],
      isEnabled: [subCategory?.isEnabled ?? true]
    });
  }

  addSubCategory() {
    const newSubCategory = this.createSubCategoryFormGroup();
    this.subCategoriesArray.push(newSubCategory);
  }

  removeSubCategory(index: number) {
    if (this.subCategoriesArray.length > 0) {
      this.subCategoriesArray.removeAt(index);
    }
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
