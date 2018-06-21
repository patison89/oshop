import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DataTableModule} from 'angular5-data-table';
import {SharedModule} from '../shared/shared.module';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {AdminAuthGuard} from './services/admin-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTableModule,
    RouterModule
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
