import { Component, effect, input, output } from '@angular/core';
import { globalModules } from '../../global-modules';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel, AccountType } from '../../models/account-model';

@Component({
  selector: 'app-new-account-form',
  imports: [...globalModules],
  templateUrl: './new-account-form.component.html',
  styleUrl: './new-account-form.component.css'
})
export class NewAccountFormComponent {
recordForm: FormGroup;
  recordModel = input<AccountModel | null>(null);
  visible = input<boolean>(false);
  onClose = output();
  onSave = output<AccountModel>();

  showModal: boolean = false;
  accountTypes: string[] = Object.values(AccountType);

  getTitle(): string {
    return this.recordModel()?.id ? 'Edit Account' : 'New Account';
  };

  constructor() {
    this.recordForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl(''),
      type: new FormControl(AccountType.Credit, [
        Validators.required,
      ]),
      isEnabled: new FormControl(true),
    });
    effect(() => {
      if (this.recordModel && this.recordModel()) {
        this.recordForm.patchValue({
          id: this.recordModel()!.id,
          name: this.recordModel()!.name,
          description: this.recordModel()!.description,
          isEnabled: this.recordModel()!.isEnabled,
        });
      }
      this.showModal = this.visible();
    });
  }

  onSubmit() {
    if (this.recordForm.valid) {
      // Handle form submission logic here
      console.log('Form submitted:', this.recordForm.value);
      this.onSave.emit(this.recordForm.value as AccountModel);
    } else {
      console.log('Form is invalid');
    }
  }
}
