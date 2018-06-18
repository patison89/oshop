import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart: any;
  subscription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
    this.productService
      .getAll().switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
