import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ShoppingCart} from '../../models/shopping-cart';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input() product: Product;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
}
