import { Injectable } from '@angular/core';
import { ProductItem } from '../model/productItem';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  confirmOrder: boolean = false;
  total : number = 0;
  productTotalArr: number[] = [];
  productTotalArrSum: number = 0;
  cartItems: ProductItem[] = [];
  productItems: ProductItem[] = [];
  private cartItemsSubject = new BehaviorSubject<ProductItem[]>(this.cartItems);

  cartItems$ = new BehaviorSubject<ProductItem[]>(this.cartItems);
  isInCart(product:any) {
    return this.cartItems.includes(product)
  }
  addToCart(product:any): void {
    if(!this.isInCart(product)){
      product.addedToCart = true;
      this.cartItems.push(product)

    }

    // this.cartItemsSubject.next(this.cartItems);
  }
  
  removeFromCart(product: ProductItem): void {
    this.cartItems = this.cartItems.filter(item => item !== product);
    product.addedToCart = false;
    product.quantity = 1;
    this.productItems[this.productItems.indexOf(product)].quantity = 1
    this.calcTotalOrder();
    // console.log(this.cartItems)
    // console.log(this.productItems)
    // this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): ProductItem[] {
    return this.cartItems;
  }
  // private cartItemSubject = new BehaviorSubject<ProductItem[]>(this.cartItems);

  // cartItems$ = this.cartItemSubject.asObservable();

  // addToCart(): void {
    // const existingItem = this.cartItems.find(item => item.name === );
    
    // if(existingItem) {
    //   existingItem.quantity++;
    // }else{
    //   product.addedToCart = true;
    //   product.quantity = 1;
    //   this.cartItems.push(product);
    // }
    // this.cartItemSubject.next(this.cartItems);
  // }


  // getCartItems(): ProductItem[] {
  //   return this.cartItems;
  // }
  
  // getTotalItems(): number {
  //   return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  // }

  // getTotalPrice() {
  //   return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // }

  // Gets total order
  calcTotalOrder() {
    for(let i = 0; i < this.cartItems.length; i++) {
      this.productTotalArr[i] = this.cartItems[i].productTotal;
    }
    this.productTotalArrSum = this.productTotalArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    })
    console.log(this.cartItems)
  }

  orderConfirmed() {
    this.confirmOrder = true;
  }

}
