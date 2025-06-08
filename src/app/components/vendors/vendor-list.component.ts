import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { globalModules } from '../../global-modules';

@Component({
  selector: 'app-vendor-list',
  imports: [...globalModules],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent {
  constructor(private vendorService: VendorService ) { }
  vendors: any[] = [];

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
  deleteVendor(id: string) {
    this.vendorService.deleteVendor(id).subscribe({
      next: () => {
        this.loadVendors(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting vendor', err);
      }
    });
  }
}
