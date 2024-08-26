import { Injectable } from '@angular/core';
import { Product } from '../models/edit-product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: Product; quantity: number }[] = [];

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.Urunler_Adi === product.Urunler_Adi);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    console.log('Product added to cart:', product);
  }

  getCartItems() {
    return this.cartItems;
  }

  updateQuantity(product: Product, quantity: number) {
    const existingItem = this.cartItems.find(item => item.product.Urunler_Adi === product.Urunler_Adi);

    if (existingItem) {
      existingItem.quantity = quantity;
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.Urunler_Fiyat * item.quantity, 0);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.product.Urunler_Adi !== product.Urunler_Adi);
  }

  clearCart() {
    this.cartItems = [];
  }
}
