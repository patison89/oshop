import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ShoppingCart} from '../models/shopping-cart';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: User;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService) {
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
