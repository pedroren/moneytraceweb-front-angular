import { Component } from '@angular/core';
import { globalModules } from '../../global-modules';
import { CategoryModel, CategoryType } from '../../models/category-model';
import { CategoryService } from '../../services/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BooleanCellPipe } from "../../pipes/boolean-cell.pipe";
import { NewCatFormComponent } from "./new-cat-form.component";

@Component({
  selector: 'app-categories-list',
  imports: [...globalModules, BooleanCellPipe, NewCatFormComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
  providers: [ConfirmationService, MessageService]
})
export class CategoriesListComponent {
constructor(private entityService: CategoryService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService ) { }
  records: CategoryModel[] = [];
  selectedRecord: CategoryModel | null = null;
  showNewEditDialog = false;

  ngOnInit() {
    this.loadRecords();
  }
  loadRecords() {
    this.entityService.getCategories().subscribe({
      next: (data) => {
        this.records = data as CategoryModel[];
      },
      error: (err) => {
        console.error('Error loading vendors', err);
      }
    });
  }
  onDialogClose() {
    this.showNewEditDialog = false;
    this.selectedRecord = null; // Reset selected vendor
  }
  onNewRecord(){
    this.selectedRecord = {id: 0, name: '', isEnabled: true, type: CategoryType.Expense, subCategories: []} // Reset selected record for a new one
    this.showNewEditDialog = true;
  }
  onEditRecord(record: CategoryModel){
    console.log('Edit vendor:', record);
    this.selectedRecord = record;
    this.showNewEditDialog = true;
  }
  onDeleteRecord(event: Event, record: CategoryModel) {
    this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
              this.deleteRecord(record.id.toString());                
            },
            reject: () => {
                this.messageService.add({ severity: 'warning', summary: 'Rejected', detail: 'You have rejected' });
            },
        });

  }
  deleteRecord(id: string) {
    this.entityService.deleteCategory(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.loadRecords(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting Record', err);
      }
    });
  }
  onRecordSave(record: CategoryModel) {
    console.log('Saving record:', record);
    return; // Temporarily disable saving logic for debugging
    if (record.id){
      // Update existing
      this.entityService.updateCategory(record.id.toString(), record).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record updated successfully' });
          this.loadRecords(); // Refresh the list after update
        },
        error: (err) => {
          console.error('Error updating Record', err);
        }
      });
    }
    else {
      // Create new
      this.entityService.createCategory(record).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor created successfully' });
          this.loadRecords(); // Refresh the list after creation
        },
        error: (err) => {
          console.error('Error creating vendor', err);
        }
      });
    }
    
    this.showNewEditDialog = false;
  }
}
