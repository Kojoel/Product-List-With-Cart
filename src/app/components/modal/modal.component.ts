import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductItem } from '../../model/productItem';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(public cartService: CartService) {}

  hideModal: boolean =false;

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
