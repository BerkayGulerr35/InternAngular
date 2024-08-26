import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/edit-product.model';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;
  isPaymentModalOpen: boolean = false; 
  cardNumber: string = '';
  expirationDate: string = '';
  cvv: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  updateQuantity(product: Product, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
  
    if (quantity > 0) {
      this.cartService.updateQuantity(product, quantity);
      this.loadCart();
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.loadCart(); 
  }

  openPaymentModal() {
    this.isPaymentModalOpen = true; 
  }

  closePaymentModal() {
    this.isPaymentModalOpen = false; 
  }

  processPayment() {
    
    console.log('Processing payment...');
    console.log('Card Number:', this.cardNumber);
    console.log('Expiration Date:', this.expirationDate);
    console.log('CVV:', this.cvv);

   
    this.isPaymentModalOpen = false;
  }
}
