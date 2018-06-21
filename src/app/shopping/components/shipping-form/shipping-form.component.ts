import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Order} from '../../../shared/models/order';
import {ShoppingCart} from '../../../shared/models/shopping-cart';
import {AuthService} from '../../../shared/services/auth.service';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: ShoppingCart;
  shipping = {};
  userId: string;
  subscription = new Subscription();


  constructor(private orderService: OrderService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.subscription.add(this.authService.user$.subscribe(user => this.userId = user.uid));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }
}
