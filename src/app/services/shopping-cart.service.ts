import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {ShoppingCart} from '../models/shopping-cart';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
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
  addToCart(product: Product) {
    this.updateItem(product, 1);
  }
  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }
  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }
  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: (item.quantity || 0) + change});
    });
  }
}
