import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductItem } from '../../model/productItem';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
// import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  clicked = false;
  initialCartQuantity = 0;
  isInCart:boolean = false
  cartItems: ProductItem[] = []
  // ordersCalc: number = 0;
  productTotal: number =0;
  
  @Input()
  productItem! : ProductItem;

  constructor(public cartService: CartService) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items
      const itemFound = items.find((cartItem) =>{ cartItem.name === this.productItem.name})
      if(itemFound){
        this.clicked = true;
      }
    })
  }

  addToCart(): void {
    // this.productItem.orderTotal = 0;
    this.productItem.quantity = 1;
    // this.initialCartQuantity = 1;
    this.productItem.addedToCart = true;
    this.cartService.addToCart(this.productItem);
    this.getProductTotal();

  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.productItem);
    this.getProductTotal();
  }


  increaseQuantity(): void {
    this.cartService.productItems[this.cartService.productItems.indexOf(this.productItem)].quantity+= 1;
    this.getProductTotal();
  }

  decreaseQuantity(): void {
    if(this.productItem.quantity <= 1) {
      this.removeFromCart();
      this.cartService.productItems[this.cartService.productItems.indexOf(this.productItem)].quantity = 0;
      // this.productItem.quantity = 0;
      // console.log(this.cartItems)
      // console.log("Decreased Prod Quant: ", this.productItem.quantity);
      // this.productItem.productTotal = this.productItem.quantity * this.productItem.price;
      console.log(this.cartService.productItems)
      this.getProductTotal();
    }
    else {
      this.cartService.productItems[this.cartService.productItems.indexOf(this.productItem)].quantity-= 1;
      // this.initialCartQuantity -= 1;
      // this.productItem.quantity -= 1;
      // console.log(this.cartItems)
      // this.productItem.productTotal = this.productItem.quantity * this.productItem.price;
      this.getProductTotal();
    }
  }

  getProductTotal() {
    this.productItem.productTotal = this.productItem.price * this.productItem.quantity;
    // console.log("Product Total: ", this.productItem.productTotal);
    this.cartService.calcTotalOrder();
  }

}