import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductItem } from '../../model/productItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  emptyCart: number = 0;
  cartItems: ProductItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(data => {
      this.cartItems = data;
      this.emptyCart = this.cartItems.length;
    });
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  removeFromCart(product: ProductItem): void {
    this.cartService.removeFromCart(product);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
