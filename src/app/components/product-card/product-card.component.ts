import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductItem } from '../../model/productItem';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  clicked = false;
  
  @Input()
  productItem! : ProductItem;

  toggleCartClicked() {
    this.clicked = !this.clicked;
  }
  
}
