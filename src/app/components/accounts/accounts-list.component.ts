import { Component, effect, input, output } from '@angular/core';
import { globalModules } from '../../global-modules';
import { AccountService } from '../../services/account.service';
import { AccountModel, AccountType } from '../../models/account-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NewAccountFormComponent } from "./new-account-form.component";
import { BooleanCellPipe } from "../../pipes/boolean-cell.pipe";

@Component({
  selector: 'app-accounts-list',
  imports: [...globalModules, NewAccountFormComponent, BooleanCellPipe],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AccountsListComponent {
  constructor(private entityService: AccountService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService ) { }
  records: any[] = [];
  selectedRecord: AccountModel | null = null;
  showNewEditDialog = false;

  ngOnInit() {
    this.loadRecords();
  }
  loadRecords() {
    this.entityService.getAccounts().subscribe({
      next: (data) => {
        this.records = data as any[];
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
    this.selectedRecord = {id: 0, name: '', description: '', isEnabled: true, type: AccountType.Credit, balance: 0} // Reset selected record for a new one
    this.showNewEditDialog = true;
  }
  onEditRecord(record: AccountModel){
    console.log('Edit vendor:', record);
    this.selectedRecord = record;
    this.showNewEditDialog = true;
  }
  onDeleteRecord(event: Event, record: AccountModel) {
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
    this.entityService.deleteAccount(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.loadRecords(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting Record', err);
      }
    });
  }
  onRecordSave(record: AccountModel) {
    if (record.id){
      // Update existing
      this.entityService.updateAccount(record.id.toString(), record).subscribe({
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
      this.entityService.createAccount(record).subscribe({
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
