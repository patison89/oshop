import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Order} from '../models/order';
import {ShoppingCart} from '../models/shopping-cart';
import {AuthService} from '../services/auth.service';
import {OrderService} from '../services/order.service';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  subscription = new Subscription();
  userId: string;

  constructor(private shoppingCartService: ShoppingCartService,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router) {}

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription.add(cart$.subscribe(cart => this.cart = cart));
    this.subscription.add(this.authService.user$.subscribe(user => this.userId = user.uid));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.storeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }


}
