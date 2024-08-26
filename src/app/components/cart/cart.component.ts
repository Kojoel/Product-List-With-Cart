import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductItem } from '../../model/productItem';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: ProductItem[] = [];
  ordersCalc: number = 0;

  itemsInCart = 0;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      // this.logCartItems();
    });
  }

  logCartItems(): void {
    this.itemsInCart = this.cartItems.length;
    console.log(this.cartItems)
  }

  removeFromCart(item: ProductItem): void {
    this.cartService.removeFromCart(item);
  }

  // calculateTotalOrder() {
  //   console.log(this.cartService.cartItems$)
  // }

  logProduct() {
    // console.log(this.cartItems)
    for(let i=0; i < this.cartItems.length; i++) {
      this.ordersCalc += this.cartItems[i].price;
    }
    console.log(this.ordersCalc)
  }
}
