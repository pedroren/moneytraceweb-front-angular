import { Injectable } from "@angular/core";
import { BackendApiService } from "./backend-api.service";
import { VendorModel } from "../models/vendor-model";

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(private apiService: BackendApiService) { }

  getVendors() {
    return this.apiService.get('vendors');
  }
  getVendorById(id: string) {
    return this.apiService.get(`vendors/${id}`);
  }
  createVendor(vendor: any) {
    return this.apiService.post('vendors', vendor);
  }
  updateVendor(id: string, vendor: VendorModel) {
    return this.apiService.put(`vendors/${id}`, vendor);
  }
  deleteVendor(id: string) {
    return this.apiService.delete(`vendors/${id}`);
  }
}
