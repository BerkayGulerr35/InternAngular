import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product } from '../models/edit-product.model';
import { CartService } from '../services/cart.service';  
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule], 
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  selectedProduct?: Product;

  constructor(private productService: ProductService, private cartService: CartService) {}  

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.currentPage).subscribe((response) => {
      this.products = response.data;
      this.totalPages = response.totalPages;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  showDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeDetails() {
    this.selectedProduct = undefined;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
