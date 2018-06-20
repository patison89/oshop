import {Component, OnDestroy, OnInit} from '@angular/core';
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
              private authService: AuthService) {}

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription.add(cart$.subscribe(cart => this.cart = cart));
    this.subscription.add(this.authService.user$.subscribe(user => this.userId = user.uid));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  placeOrder() {
    const order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(item => {
        return {
          product: {
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice
        };
      })
    };
    this.orderService.storeOrder(order);
  }


}
