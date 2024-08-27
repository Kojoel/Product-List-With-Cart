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
  totalofProduct: number = 0;

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
    this.cartService.calcTotalOrder();
  }

  // // Gets total order
  // calcTotalOrder() {
  //   this.cartItems.forEach(item => {
  //     console.log(item.productTotal);
  //     this.ordersCalc += item.productTotal;
  //     console.log(this.cartService.total) 
  //   })
  // }
  


}
