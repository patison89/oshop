import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../models/product';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }
  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    } else {
      return cartId;
    }
  }
  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    item$.take(1).subscribe(item => {
      if (item.$exists()) {
        item$.update({quantity: item.quantity + 1});
      } else {
        item$.set({product, quantity: 1});
      }
    });
  }
}
