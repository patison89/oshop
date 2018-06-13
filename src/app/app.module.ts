import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CustomFormsModule} from 'ng2-validation';


import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import {CategoryService} from './services/category.service';
import {ProductService} from './services/product.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {AdminAuthGuard} from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {DataTableModule} from 'angular5-data-table';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'admin/products/new', component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
