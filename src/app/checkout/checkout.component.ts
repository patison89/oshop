import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ShoppingCart} from '../models/shopping-cart';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
