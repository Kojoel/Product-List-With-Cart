import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductItem } from '../../model/productItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(public cartService: CartService) {}

  cartItems: ProductItem[] = [];

  hideModal: boolean =false;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  startNewOrder() {
      this.cartService.confirmOrder = this.hideModal;
      this.clearCart();
      console.log("Cart Items: ", this.cartService.cartItems)
  }

  clearCart() {
    this.cartService.cartItems.forEach(item => {
      this.cartService.removeFromCart(item);
    })
  }

}
