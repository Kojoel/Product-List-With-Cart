import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductItem } from '../../model/productItem';
import { CartService } from '../../services/cart.service';
// import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  clicked = false;
  initialCartQuantity = 0;
  
  @Input()
  productItem! : ProductItem;

  constructor(private cartService: CartService) {}

  toggleCartClicked() {
    this.clicked = !this.clicked;
  }

  addToCart(): void {
    this.productItem.orderTotal = 0;
    this.cartService.addToCart(this.productItem);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.productItem);
  }


  increaseQuantity(): void {
    this.initialCartQuantity += 1;
    this.productItem.quantity = this.initialCartQuantity;
    this.productItem.productTotal = this.productItem.quantity * this.productItem.price;

    console.log("Quantity: ", this.productItem.quantity, "product total: ", this.productItem.productTotal, "Order total: ", this.productItem.orderTotal)
    console.log(" ")
  }

  decreaseQuantity(): void {
    if(this.productItem.quantity <= 1) {
      this.toggleCartClicked();
      this.removeFromCart();
      setTimeout(() => {
        this.initialCartQuantity -= 1;
        this.productItem.quantity = this.initialCartQuantity;
        this.productItem.productTotal = this.productItem.quantity * this.productItem.price;

        console.log("Quantity: ", this.productItem.quantity, "product total: ", this.productItem.productTotal, "Order total: ", this.productItem.orderTotal)
        console.log(" ")
      }, 500)
    }
    else {
      this.initialCartQuantity -= 1;
      this.productItem.quantity = this.initialCartQuantity;
      this.productItem.productTotal = this.productItem.quantity * this.productItem.price;
      
      console.log("Quantity: ", this.productItem.quantity, "product total: ", this.productItem.productTotal, "Order total: ", this.productItem.orderTotal)
      console.log(" ")
    }
  }

  getOrderTotal() {

  }
  
}
