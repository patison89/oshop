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
  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }
  getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);

  }
  private async getOrCreateCartId(): Promise<string> {
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
    const item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({product: product, quantity: (item.quantity || 0) + 1});
    });
  }
}
