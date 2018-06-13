import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  categories$;

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
    this.products$ = this.productService.getAll();
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {
  }

}
