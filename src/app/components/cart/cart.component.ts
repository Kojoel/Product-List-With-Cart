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
export class CartComponent implements OnInit {
  cartItems: ProductItem[] = [];

  itemsInCart = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.logCartItems();
    });
  }

  logCartItems(): void {
    this.itemsInCart = this.cartItems.length;
    console.log(this.cartItems)
  }

  removeFromCart(item: ProductItem): void {
    this.cartService.removeFromCart(item);
  }
}
