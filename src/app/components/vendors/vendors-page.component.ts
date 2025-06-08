import { Component } from '@angular/core';
import { VendorListComponent } from "./vendor-list.component";
import { globalModules } from '../../global-modules';

@Component({
  selector: 'app-vendors-page',
  imports: [...globalModules, VendorListComponent],
  templateUrl: './vendors-page.component.html',
  styleUrl: './vendors-page.component.css'
})
export class VendorsPageComponent {
  constructor() { 
    // Initialization logic can go here if needed
  }
}
