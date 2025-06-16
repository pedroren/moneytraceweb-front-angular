import { Injectable } from "@angular/core";
import { BackendApiService } from "./backend-api.service";
import { CategoryModel } from "../models/category-model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private apiService: BackendApiService) { }

  getCategories() {
    return this.apiService.get('categories');
  }

  getCategoryById(id: string) {
    return this.apiService.get(`categories/${id}`);
  }

  createCategory(category: CategoryModel) {
    return this.apiService.post('categories', category);
  }

  updateCategory(id: string, category: CategoryModel) {
    return this.apiService.put(`categories/${id}`, category);
  }

  deleteCategory(id: string) {
    return this.apiService.delete(`categories/${id}`);
  }
}
// This service provides methods to interact with the backend API for category CRUD operations.