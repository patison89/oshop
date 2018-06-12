import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).take(1).subscribe((p => this.product = p));
    }
  }
  save(product) {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
