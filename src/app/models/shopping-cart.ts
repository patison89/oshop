import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: {[productId: string]: ShoppingCartItem}) {
    for(const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }
get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice
    }
    return sum;
}
  get totalItemsCount() {
    let count = 0;
    for (const productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }
}
