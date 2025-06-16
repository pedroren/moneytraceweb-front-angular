import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { globalModules } from '../../global-modules';
import { VendorModel } from '../../models/vendor-model';
import { NewVendorFormComponent } from "./new-vendor-form.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { BooleanCellPipe } from "../../pipes/boolean-cell.pipe";

@Component({
  selector: 'app-vendor-list',
  imports: [...globalModules, NewVendorFormComponent, BooleanCellPipe],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css',
  providers: [ConfirmationService, MessageService]
})
export class VendorListComponent {
  constructor(private entityService: VendorService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService ) { }
  records: VendorModel[] = [];
  selectedRecord: VendorModel | null = null;
  showNewEditDialog = false;

  ngOnInit() {
    this.loadRecords();
  }
  loadRecords() {
    this.entityService.getVendors().subscribe({
      next: (data) => {
        this.records = data as VendorModel[];
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
    this.selectedRecord = {id: 0, name: '', isEnabled: true} // Reset selected vendor for new vendor
    this.showNewEditDialog = true; // Show the form for creating a new vendor
  }
  onEditRecord(record: VendorModel){
    console.log('Edit vendor:', record);
    this.selectedRecord = record;
    this.showNewEditDialog = true;
  }
  onDeleteRecord(event: Event, record: VendorModel) {
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
    this.entityService.deleteVendor(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.loadRecords(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting vendor', err);
      }
    });
  }
  onRecordSave(record: VendorModel) {
    if (record.id){
      // Update existing
      this.entityService.updateVendor(record.id.toString(), record).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor updated successfully' });
          this.loadRecords(); // Refresh the list after update
        },
        error: (err) => {
          console.error('Error updating vendor', err);
        }
      });
    }
    else {
      // Create new
      this.entityService.createVendor(record).subscribe({
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
