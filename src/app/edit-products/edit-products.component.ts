import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product } from '../models/edit-product.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
  standalone: true,
  imports: [CommonModule], 
})
export class EditProductsComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Error loading products:', err);
       
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  editProduct(productId: string): void {
    console.log('Edit product with ID:', productId);
   
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('Product deleted');
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          
        }
      });
    }
  }
}
