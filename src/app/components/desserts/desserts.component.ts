import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-desserts',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './desserts.component.html',
  styleUrl: './desserts.component.scss'
})
export class DessertsComponent{

  constructor( private dataService: DataService, public cartService:CartService ) {}

  ngOnInit() {
    this.dataService.getProducts()
      .subscribe((data:any) => 
        {
          data.forEach((item:any)=>{
            item.quantity =1;
            item.addedToCart= false
            this.cartService.productItems.push(item)
          })
        });
  }

}
