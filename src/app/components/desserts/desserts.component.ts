import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-desserts',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './desserts.component.html',
  styleUrl: './desserts.component.scss'
})
export class DessertsComponent{
  productItems : any [] = [];

  constructor( private dataService: DataService ) {}

  ngOnInit() {
    this.dataService.getProducts()
      .subscribe(data => this.productItems = data);
  }

}
