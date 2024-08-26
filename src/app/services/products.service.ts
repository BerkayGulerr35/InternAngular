import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/edit-product.model';

interface ProductResponse {
  data: Product[];
  page: number;
  totalPages: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, limit: number = 5): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
