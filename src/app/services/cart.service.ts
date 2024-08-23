import { Injectable } from '@angular/core';
import { ProductItem } from '../model/productItem';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: ProductItem[] = [];
  private cartItemSubject = new BehaviorSubject<ProductItem[]>(this.cartItems);

  cartItems$ = this.cartItemSubject.asObservable();

  addToCart(product: ProductItem): void {
    const existingItem = this.cartItems.find(item => item.name === product.name);
    
    if(existingItem) {
      existingItem.quantity++;
    }else{
      product.addedToCart = true;
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.cartItemSubject.next(this.cartItems);
  }

  removeFromCart(product: ProductItem): void {
    this.cartItems = this.cartItems.filter(item => item.name !== product.name);
    product.addedToCart = false;
    product.quantity = 0;
    this.cartItemSubject.next(this.cartItems);
  }

  getCartItems(): ProductItem[] {
    return this.cartItems;
  }
  
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

}
