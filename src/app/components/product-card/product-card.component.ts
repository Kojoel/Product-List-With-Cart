import { Component, OnInit, Input, SimpleChange } from '@angular/core';
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
  isInCart:boolean = false
  cartItems: ProductItem[] = []
  ordersCalc: number = 0;
  
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

  // ngOnChanges(changes: SimpleChange): void {
  //   console.log("changes : ", changes)
  //   // if(changes['cartItems'] && this['cartItems']){
  //     // this.cartService.cartItems$.subscribe(items => {
  //     //   console.log("cart items in product: ", items)
  //     //   this.cartItems = items
      
  //     //   const itemFound = items.find((cartItem) =>{ cartItem.name === this.productItem.name})
  //     //   if(itemFound){
  //     //     this.clicked = true;
  //     //   }
          
      
  //     // })

  //   // }
  // }


  toggleCartClicked() {
    // this.clicked = !this.clicked;
    // this.cartService.cartItems$.subscribe((items) => {
    //   this.cartItems = items
    //   const itemFound = items.find((cartItem) =>{ cartItem.name === this.productItem.name})
    //   if(itemFound){
    //       this.clicked = true;
    //     }
    // })
  }

  addToCart(): void {
    this.productItem.orderTotal = 0;
    this.productItem.addedToCart = true;
    this.cartService.addToCart(this.productItem);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.productItem);
  }


  increaseQuantity(): void {
    // this.initialCartQuantity += 1;
    // this.productItem.quantity = this.initialCartQuantity;
    // this.productItem.productTotal = this.productItem.quantity * this.productItem.price;
    this.cartService.productItems[this.cartService.productItems.indexOf(this.productItem)].quantity+= 1;
    // console.log("Quantity: ", this.productItem.quantity, "product total: ", this.productItem.productTotal, "Order total: ", this.productItem.orderTotal)
    // console.log(" ")
  }

  decreaseQuantity(): void {
    if(this.productItem.quantity <= 1) {
      this.removeFromCart();
      this.cartService.productItems[this.cartService.productItems.indexOf(this.productItem)].quantity-= 1;
      setTimeout(() => {
        this.initialCartQuantity -= 1;
        this.productItem.quantity = this.initialCartQuantity;
        this.productItem.productTotal = this.productItem.quantity * this.productItem.price;

        // console.log("Quantity: ", this.productItem.quantity, "product total: ", this.productItem.productTotal, "Order total: ", this.productItem.orderTotal)
        // console.log(" ")
      }, 500)
    }
    else {
      this.initialCartQuantity -= 1;
      this.productItem.quantity -= 1;
      this.productItem.productTotal = this.productItem.quantity * this.productItem.price;
      
      // console.log("Quantity: ", this.productItem.quantity, "product total: ", this.productItem.productTotal, "Order total: ", this.productItem.orderTotal)
      // console.log(" ")
    }
  }

  getOrderTotal() {
    console.log(this.cartItems)
    for(let i=0; i < this.cartItems.length; i++) {
      this.ordersCalc += this.cartItems[i].price;
    }
    console.log(this.ordersCalc)
  }
  
}
