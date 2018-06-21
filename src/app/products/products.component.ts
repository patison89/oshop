import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../shared/models/product';
import {ShoppingCart} from '../shared/models/shopping-cart';
import {ProductService} from '../shared/services/product.service';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateproducts();
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
  }
  private populateproducts() {
    this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }
}
