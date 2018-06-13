import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input() product: Product;
  @Input() showActions = true;

  constructor() { }

}
