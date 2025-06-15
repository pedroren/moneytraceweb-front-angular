import { Injectable } from "@angular/core";
import { BackendApiService } from "./backend-api.service";
import { AccountModel } from "../models/account-model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private apiService: BackendApiService) { }

  getAccounts() {
    return this.apiService.get('accounts');
  }

  getAccountById(id: string) {
    return this.apiService.get(`accounts/${id}`);
  }

  createAccount(account: AccountModel) {
    return this.apiService.post('accounts', account);
  }

  updateAccount(id: string, account: AccountModel) {
    return this.apiService.put(`accounts/${id}`, account);
  }

  deleteAccount(id: string) {
    return this.apiService.delete(`accounts/${id}`);
  }
}
// This service provides methods to interact with the backend API for account crud.