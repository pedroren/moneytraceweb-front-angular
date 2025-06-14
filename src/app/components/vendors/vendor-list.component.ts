import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { globalModules } from '../../global-modules';
import { VendorModel } from '../../models/vendor-model';
import { NewVendorFormComponent } from "./new-vendor-form.component";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-vendor-list',
  imports: [...globalModules, NewVendorFormComponent],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css',
  providers: [ConfirmationService, MessageService]
})
export class VendorListComponent {
  constructor(private vendorService: VendorService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService ) { }
  vendors: any[] = [];
  selectedVendor: VendorModel | null = null;
  showVendorDialog = false;

  ngOnInit() {
    this.loadVendors();
  }
  loadVendors() {
    this.vendorService.getVendors().subscribe({
      next: (data) => {
        this.vendors = data as any[];
      },
      error: (err) => {
        console.error('Error loading vendors', err);
      }
    });
  }
  onDialogClose() {
    this.showVendorDialog = false;
    this.selectedVendor = null; // Reset selected vendor
  }
  onNewVendor(){
    console.log('New vendor button clicked');
    this.selectedVendor = new VendorModel(0, "", true); // Reset selected vendor for new vendor
    this.showVendorDialog = true; // Show the form for creating a new vendor
  }
  onEditVendor(vendor: VendorModel){
    console.log('Edit vendor:', vendor);
    this.selectedVendor = vendor;
    this.showVendorDialog = true;
  }
  onDeleteVendor(event: Event, vendor: VendorModel) {
    console.log('Delete vendor:', vendor);
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
              this.deleteVendor(vendor.id.toString());                
            },
            reject: () => {
                this.messageService.add({ severity: 'warning', summary: 'Rejected', detail: 'You have rejected' });
            },
        });

  }
  deleteVendor(id: string) {
    this.vendorService.deleteVendor(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.loadVendors(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting vendor', err);
      }
    });
  }
  onVendorSave(vendor: VendorModel) {
    if (vendor.id){
      console.log('Vendor update received:', vendor);
      // Update existing vendor
      this.vendorService.updateVendor(vendor.id.toString(), vendor).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor updated successfully' });
          this.loadVendors(); // Refresh the list after update
        },
        error: (err) => {
          console.error('Error updating vendor', err);
        }
      });
    }
    else {
      console.log('New vendor received:', vendor);
      // Create new vendor
      this.vendorService.createVendor(vendor).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor created successfully' });
          this.loadVendors(); // Refresh the list after creation
        },
        error: (err) => {
          console.error('Error creating vendor', err);
        }
      });
    }
    
    this.showVendorDialog = false;
  }
  
}
